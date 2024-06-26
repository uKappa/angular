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
  selectedWebsites: Website[] = [];

  mostrarChecks: boolean = false;

  websites: Website[] = [];

  urls: Url[] = [];
  new: any;
  filteredWebsites: Website[] = [];
  sortingOption: string = 'data_registo';

  constructor(private websiteService: WebsiteService){}

  mostrarCheckboxes() {
    this.selectedWebsites = [];
    this.mostrarChecks = !this.mostrarChecks;
  }

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
    alert('Invalid URL: URL Should begin with http://, https:// or ftp://, can\'t have a blank space')
  }

  goBack() {
    this.selectedWebsite = undefined;
  }
  

  add(url: string): void {
    url = url.trim();
    if (!url) { return; }
    const newUrl: Url = {link: url,
      estado: EstadoPag.PorAvaliar,
      ultima_aval: null,
      errorA: false,
      errorAA: false,
      errorAAA: false,
      nTestesPassados: -1,
      nTestesAvisos: -1,
      nTestesFalhos: -1,
      nTestesInaplicaveis: -1,
      repo: []
    };

    console.log(newUrl)

    this.websiteService.addWebsite(newUrl) 
      .subscribe(website => {
        this.websites.push(website);
      });
  }

  delete(website: Website): void {
    //this.websites = this.websites.filter(h => h !== website);
    //this.websiteService.deleteWebsite(website._id).subscribe();
    if (website.urls && website.urls.length > 0) {
      if (confirm('Este website tem páginas associadas. Tem certeza de que deseja excluí-lo?')) {
        this.websites = this.websites.filter(h => h !== website);
        this.websiteService.deleteWebsite(website._id).subscribe();
        this.selectedWebsite = undefined;
      }
    } else {
      this.websites = this.websites.filter(h => h !== website);
      this.websiteService.deleteWebsite(website._id).subscribe();
      this.selectedWebsite = undefined;
    }
  }  

  toggleSelection(website: Website): void {
    //const index = this.selectedWebsites.indexOf(website);
    if (this.selectedWebsites.includes(website)) {
      //this.selectedWebsites.push(website); // Adiciona o site se não estiver selecionado
      this.selectedWebsites = this.selectedWebsites.filter(item => item !== website);
    } else {
      //this.selectedWebsites.splice(index, 1); // Remove o site se já estiver selecionado
      this.selectedWebsites.push(website);
    }
    console.log(this.selectedWebsites);
  }

  iniciarAvaliacao(selectedWebsites: Website[]): void {
    this.selectedWebsites = this.selectedWebsites.filter(website => website.estado === "PorAvaliar");
    for (const website of this.selectedWebsites) {
      website.estado = Estado.EmAvaliacao
    }
    this.websiteService.iniciarAvaliacao(this.selectedWebsites).subscribe(x => this.websites = x);

    
  }
}