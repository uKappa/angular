import { Component } from '@angular/core';
import { Estado } from '../estado';
import { Website } from '../website';
import { WEBSITES } from '../mock-sites';
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

}
