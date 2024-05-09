import { Component, Input } from '@angular/core';
import { Website } from '../website';
import { WebsiteService } from '../website.service';
import { ActivatedRoute } from '@angular/router';
import { link } from 'fs';
import { Url } from '../url';
import { EstadoPag } from '../estadoPag';

@Component({
  selector: 'app-website-detail',
  templateUrl: './website-detail.component.html',
  styleUrl: './website-detail.component.css'
})
export class WebsiteDetailComponent {

  @Input() website? : Website;

  @Input() newUrl?: string;

  constructor(private websiteService: WebsiteService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getWebsite();
  }


  getWebsite() {
    if (this.website && this.website._id) {
      const id = this.website._id;
      this.websiteService.getWebsite(id).subscribe(x => this.website = x);
    }
  }

  isValidUrl(url: string): boolean {
    // Expressão regular para validar URLs
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  }
  
  notValid() {
    alert('Invalid URL')
  }


  addUrl(): void {
    if (this.newUrl && this.website) {
      
      if (this.website.url) {
        if (!this.newUrl.startsWith(this.website.url.link)) {
          alert('Os URLs específicos devem pertencer ao mesmo domínio.');
          return;
        }
        var a: Url = {
          link: this.newUrl,
          estado: EstadoPag.Naoconforme,
          ultima_aval: null
        }

        if (!this.website.urls) {
          this.website.urls = [];
        }
        console.log(a)
        this.website.urls.push(a);
        this.websiteService.updateWebsite(this.website).subscribe(() => {
          console.log('URL adicionada com sucesso:', a.link);
        });
      }
      
    } else {
      console.log('Por favor, insira uma URL válida.');
    }
  }


  delete(url: Url): void {
    this.websiteService.deletePagina(url).subscribe();
  }

}
