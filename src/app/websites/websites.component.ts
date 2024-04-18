import { Component } from '@angular/core';
import { Estado } from '../estado';
import { Website } from '../website';
import { WebsiteService } from "../website.service";

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrl: './websites.component.css'
})
export class WebsitesComponent {

  selectedWebsite?: Website;

  websites: Website[] = [];

  constructor(private websiteService: WebsiteService){}

  onSelected(website: Website): void{
    this.selectedWebsite = website;
  }

  ngOnInit(): void{
    this.getWebsites();
  }

  getWebsites(): void{
    this.websiteService.getWebsites().subscribe(x => this.websites = x);
  }

  add(url: string): void {
    url = url.trim();
    if (!url) { return; }
    this.websiteService.addWebsite({ url: url, id: 5, estado: Estado.PorAvaliar, urls: [] } as unknown as Website) //TODO alterar id nisto
      .subscribe(website => {
        this.websites.push(website);
      });
  }

}