import { Component } from '@angular/core';
import { Estado } from '../estado';
import { Website } from '../website';
import { Url } from '../url';
import { WebsiteService } from "../website.service";
import { EstadoPag } from '../estadoPag';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrl: './websites.component.css'
})
export class WebsitesComponent {

  selectedWebsite?: Website;

  websites: Website[] = [];

  urls: Url[] = [];

  constructor(private websiteService: WebsiteService){}

  onSelected(website: Website): void{
    this.selectedWebsite = website;
  }

  ngOnInit(): void {
    this.getWebsites();
    if (this.websites.length > 1 && this.websites[1].url) {
      const link = this.websites[1].url.link;
      console.log(link); 
    }
  }

  getWebsites(): void{
    this.websiteService.getWebsites().subscribe(x => this.websites = x);
  }
  
  isValidUrl(url: string): boolean {
    // Expressão regular para validar URLs
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  }
  
  notValid() {
    alert('Invalid URL')
  }
  

  add(url: string): void {
    url = url.trim();
    if (!url) { return; }
    const newUrl: Url = {link: url, estado: EstadoPag.Naoconforme, ultima_aval: new Date()};

    console.log(newUrl)

    this.websiteService.addWebsite(newUrl) 
      .subscribe(website => {
        this.websites.push(website);
      });
  }

}