import { Component, Input } from '@angular/core';
import { Url } from '../url';
import { WebsiteService } from '../website.service';

@Component({
  selector: 'app-website-acessibilidade',
  templateUrl: './website-acessibilidade.component.html',
  styleUrls: ['./website-acessibilidade.component.css']
})
export class WebsiteAcessibilidadeComponent {

  @Input() selectedUrlPagina?: Url;

  constructor(private websiteService: WebsiteService){}

  ngOnInit(): void {

  }




}
