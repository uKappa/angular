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
  new: any;
  filteredWebsites: Website[] = [];
  sortingOption: string = 'data_registo';

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

  applyFilterAndSort(): void {
    this.filteredWebsites.sort((a, b) => {

      if (this.sortingOption === 'data_registo') {
        return new Date(b.data_registo).getTime() - new Date(a.data_registo).getTime();
      } else if (this.sortingOption === 'ultima_aval') {
        const aDate = a.url?.ultima_aval ? new Date(a.url.ultima_aval).getTime() : 0;
        const bDate = b.url?.ultima_aval ? new Date(b.url.ultima_aval).getTime() : 0;
        return bDate - aDate;
      } else {
        return 0;
      }
    });
  }
  
  isValidUrl(url: string): boolean {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  }
  
  notValid() {
    alert('Invalid URL')
  }
  

  add(url: string): void {
    url = url.trim();
    if (!url) { return; }
    const newUrl: Url = {link: url, estado: EstadoPag.Naoconforme, ultima_aval: null};

    console.log(newUrl)

    this.websiteService.addWebsite(newUrl) 
      .subscribe(website => {
        this.websites.push(website);
      });
  }

}