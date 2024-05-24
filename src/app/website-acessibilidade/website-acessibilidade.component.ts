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
  filteredRules?: any[] = [];

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
      
    console.log("Filtered Rules:", this.filteredRules);
    console.log(this.rules);
    this.filteredRules = this.rules;

    if(this.filteredRules){
      if (this.filterOption == 'tipo') {
        if (this.testType == 'regra'){
          this.filteredRules = this.filteredRules.filter(rule => rule.ruleType === "ACT");
        }else {
          this.filteredRules = this.filteredRules.filter(rule => rule.ruleType === "WCAG");
        }
      }

      if (this.filterOption == 'conformidade') {
        if (this.testType == 'A'){
          this.filteredRules = this.filteredRules.filter(rule => rule.ruleType === "A");
        }if (this.testType == 'AA'){
          this.filteredRules = this.filteredRules.filter(rule => rule.ruleType === "AA");
        }if (this.testType == 'AAA'){
          this.filteredRules = this.filteredRules.filter(rule => rule.ruleType === "AAA");
        }else {
          this.filteredRules = this.filteredRules.filter(rule => rule.ruleType === "");
        }
      }

      if (this.filterOption == 'resultado') {
        if (this.testType == 'passado'){
          this.filteredRules = this.filteredRules.filter(rule => rule.ruleType === "passed");
        }if (this.testType == 'aviso'){
          this.filteredRules = this.filteredRules.filter(rule => rule.ruleType === "warning");
        }if (this.testType == 'falhado'){
          this.filteredRules = this.filteredRules.filter(rule => rule.ruleType === "failed");
        }else {
          this.filteredRules = this.filteredRules.filter(rule => rule.ruleType === "inapplicable");
        }
      }

    }
    
  }

}
