import { Component, Input } from '@angular/core';
import { Website } from '../website';
import { WebsiteService } from '../website.service';
import { ActivatedRoute } from '@angular/router';
import { link } from 'fs';
import { Url } from '../url';
import { EstadoPag } from '../estadoPag';
import { Estado } from '../estado';
import { Rule } from '../rule';
import { Repo } from '../repo';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-website-detail',
  templateUrl: './website-detail.component.html',
  styleUrl: './website-detail.component.css'
})
export class WebsiteDetailComponent {

  @Input() website? : Website;

  @Input() url? : Url;

  @Input() repo? : Repo;

  @Input() newUrl?: string;
  
  reports: Repo[] = [];

  urls?: Url[] = this.website?.urls;

  numberOfPages = 1;
  noErrorPage = 0;
  atLeastOneError = 0;
  atLeastOneErrorA = 0;
  atLeastOneErrorAA = 0;
  atLeastOneErrorAAA = 0;

  temp = 0;
  
  selectedUrl?: Url;

  selectedUrls: Url[] = [];

  mostrarChecks: boolean = false;

  //datatimelimit: Subscription | undefined;

  constructor(private websiteService: WebsiteService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getWebsite();
    //this.datatimelimit = interval(5000)
    //try {
    //  this.datatimelimit=interval(5000).subscribe(response => {
    //  this.getReport();
    //  })
    //} catch (error) {
    //  
    //}
  }


  getWebsite() {
    if (this.website && this.website._id) {
      const id = this.website._id;
      this.websiteService.getWebsite(id).subscribe(x => this.website = x);
    }
  }

  getReport() {
    if (this.website && this.website._id) {
      const id = this.website._id;
      this.websiteService.getReport(id).subscribe(
        (repo: any) => {
          if(repo != null && !this.reports.some(report => report.link === repo.link)){
            this.reports.push(repo);
          }
        },
        (error) => {
        if (error.status === 200) {
          console.log("stopInterval")
          this.websiteService.stopInterval();
        }
        console.log('Dados recebidos:', error);
      });
    }
    if (this.temp == 0) {
      console.log(this.reports);
      this.getNoErrorPag()
      this.getAtLeastOneErrorPag()
      this.getAtLeastOneErrorPagA()
      this.getAtLeastOneErrorPagAA()
      this.getAtLeastOneErrorPagAAA()
      this.temp += 1
    }
  }

  getNoErrorPag() {
    //console.log(this.reports)
    for (const report of this.reports) {
      var passed = 0;
      var warning = 0;
      var failed = 0;
      var inapplicable = 0;
      console.log(report)
      for (const rule of report.rules) {
        passed = passed + rule.passed
        warning = warning + rule.warning
        failed = failed + rule.failed
        inapplicable = inapplicable + rule.inapplicable
      }
      if (warning == 0 && failed == 0 && inapplicable == 0) {
        this.noErrorPage += 1
        return
      }
    }
  }

  getAtLeastOneErrorPag() {
    for (const report of this.reports) {
      var passed = 0;
      var warning = 0;
      var failed = 0;
      var inapplicable = 0;
      for (const rule of report.rules) {
        passed = passed + rule.passed
        warning = warning + rule.warning
        failed = failed + rule.failed
        inapplicable = inapplicable + rule.inapplicable
        console.log(rule);
      }
      if (warning != 0 || failed != 0 || inapplicable != 0) {
        this.atLeastOneError += 1
        return
      }
    }
  }

  getAtLeastOneErrorPagA() {
    for (const report of this.reports) {
      var passed = 0;
      var warning = 0;
      var failed = 0;
      var inapplicable = 0;
      for (const rule of report.rules) {
        passed = passed + rule.passed
        warning = warning + rule.warning
        failed = failed + rule.failed
        inapplicable = inapplicable + rule.inapplicable
        if (warning != 0 || failed != 0 || inapplicable != 0) {
          rule.ruleLevel = "A"
          this.atLeastOneErrorA += 1
          return
        }
      }
    }
  }

  getAtLeastOneErrorPagAA() {
    for (const report of this.reports) {
      var passed = 0;
      var warning = 0;
      var failed = 0;
      var inapplicable = 0;
      for (const rule of report.rules) {
        passed = passed + rule.passed
        warning = warning + rule.warning
        failed = failed + rule.failed
        inapplicable = inapplicable + rule.inapplicable
        if (warning != 0 || failed != 0 || inapplicable != 0) {
          rule.ruleLevel = "AA"
          this.atLeastOneErrorAA += 1
          return
        }
      }
    }
  }

  getAtLeastOneErrorPagAAA() {
    for (const report of this.reports) {
      var passed = 0;
      var warning = 0;
      var failed = 0;
      var inapplicable = 0;
      for (const rule of report.rules) {
        passed = passed + rule.passed
        warning = warning + rule.warning
        failed = failed + rule.failed
        inapplicable = inapplicable + rule.inapplicable
        if (warning != 0 || failed != 0 || inapplicable != 0) {
          rule.ruleLevel = "AAA"
          this.atLeastOneErrorAAA += 1
          return
        }
      }
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

  toggleSelection(url: Url): void {
    //const index = this.selectedUrls.indexOf(website);
    if (this.selectedUrls.includes(url)) {
      //this.selectedUrls.push(website); // Adiciona o site se não estiver selecionado
      this.selectedUrls = this.selectedUrls.filter(item => item !== url);
    } else {
      //this.selectedUrls.splice(index, 1); // Remove o site se já estiver selecionado
      this.selectedUrls.push(url);
    }
    console.log(this.selectedUrls);
  }

  iniciarAvaliacao(selectedUrls: Url[]): void {
    this.selectedUrls = this.selectedUrls.filter(url => url.estado === "PorAvaliar");
    for (const url of this.selectedUrls) {
      url.estado = EstadoPag.EmAvaliacao
    }
    this.websiteService.iniciarAvaliacaoUrl(this.selectedUrls).subscribe(x => this.selectedUrls = x);
    this.websiteService.startInterval(() => {
      console.log('Intervalo iniciado em Component1');
      this.getReport();
    }, 15000);
  }

  mostrarCheckboxes() {
    this.selectedUrls = [];
    this.mostrarChecks = !this.mostrarChecks;
  }
}
