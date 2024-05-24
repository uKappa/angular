import { Component, Input } from '@angular/core';
import { Url } from '../url';
import { WebsiteService } from '../website.service';
import { Rule } from '../rule';

@Component({
  selector: 'app-website-acessibilidade',
  templateUrl: './website-acessibilidade.component.html',
  styleUrls: ['./website-acessibilidade.component.css']
})
export class WebsiteAcessibilidadeComponent {

  @Input() selectedUrlPagina?: Url;

  rules?: Rule[]
  filteredRules?: Rule[] = [];

  passed = 0
  warned = 0
  failed = 0
  inaplicable = 0
  total = 0

  filterOption: string = 'tipo';

  testType: string = 'regra';
  complianceLevel: string = 'A';
  testResult: string = 'passado'


  constructor(private websiteService: WebsiteService){}

  ngOnInit(): void {
    this.getUrl()
    console.log(this.selectedUrlPagina!.repo)
    this.filteredRules = this.rules;
  }

  getUrl() {
    if (this.selectedUrlPagina && this.selectedUrlPagina._id) {
      const id = this.selectedUrlPagina._id;
      this.websiteService.getUrl(id).subscribe(x =>{
        this.selectedUrlPagina! = x
        this.passed = this.selectedUrlPagina!.nTestesPassados
        this.failed = this.selectedUrlPagina!.nTestesFalhos
        this.warned = this.selectedUrlPagina!.nTestesAvisos
        this.inaplicable = this.selectedUrlPagina!.nTestesInaplicaveis
        this.total = this.passed + this.warned + this.failed + this.inaplicable
        this.getRules()
      });
    }
  }

  getRules() {
    this.websiteService.getRules(this.selectedUrlPagina!.repo[0]).subscribe(x => {this.rules = x, this.filteredRules = this.rules;})
  }


  applyFilter() {

    if (this.rules) 
      
    console.log(this.rules);
    this.filteredRules = this.rules;

    if(this.filteredRules){
      if (this.filterOption == 'tipo') {
        console.log('tipo')
        if (this.testType == 'regra'){
          this.filteredRules = this.filteredRules.filter(rule => rule.ruleType === "ACT");
        }else {
          this.filteredRules = this.filteredRules.filter(rule => rule.ruleType === "WCAG");
        }
      }

      if (this.filterOption == 'conformidade') {
        console.log('conformidade')
        if (this.complianceLevel == 'A'){
          this.filteredRules = this.filteredRules.filter(rule => rule.ruleLevel === "A");
        }if (this.complianceLevel == 'AA'){
          this.filteredRules = this.filteredRules.filter(rule => rule.ruleLevel === "AA");
        }if (this.complianceLevel == 'AAA'){
          this.filteredRules = this.filteredRules.filter(rule => rule.ruleLevel === "AAA");
        }else {
          this.filteredRules = this.filteredRules.filter(rule => rule.ruleLevel === "");
        }
      }

      if (this.filterOption == 'resultado') {
        console.log('resultado')
        console.log(this.testResult)
        if (this.testResult == 'passado'){
          this.filteredRules = this.filteredRules.filter(rule => rule.passed != 0 && rule.warning === 0 && rule.failed === 0 && rule.inapplicable === 0);
        }if (this.testResult == 'aviso'){
          this.filteredRules = this.filteredRules.filter(rule => rule.warning != 0 && rule.failed === 0 && rule.inapplicable === 0);
        }if (this.testResult == 'falhado'){
          this.filteredRules = this.filteredRules.filter(rule => rule.failed != 0 && rule.inapplicable === 0);
        }if (this.testResult == 'nao_aplicavel'){
          this.filteredRules = this.filteredRules.filter(rule => rule.inapplicable != 0);
        }
      }

    }
    console.log("Filtered Rules:", this.filteredRules);
  }

}
