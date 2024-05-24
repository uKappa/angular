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

  passed = 0
  warned = 0
  failed = 0
  inaplicable = 0
  total = 0

  constructor(private websiteService: WebsiteService){}

  ngOnInit(): void {
    this.getUrl()
    console.log(this.selectedUrlPagina!.repo)
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
    this.websiteService.getRules(this.selectedUrlPagina!.repo[0]).subscribe(x => this.rules = x)
  }

}
