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
    )}
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
    console.log(this.website!.urls)
    let count = -1;
    for (const url of this.website!.urls) {
      if (!url.errorA && !url.errorAA && !url.errorAAA) {
        this.noErrorPage += 1;
      }
    }
    //console.log(this.reports)
    //for (const report of this.reports) {
      //if (report.errorA || report.errorAA || report.errorAAA) {
      //  
      //}
      //
      //var passed = 0;
      //var warning = 0;
      //var failed = 0;
      //var inapplicable = 0;
      //console.log(report)
      //for (const rule of report.rules) {
      //  passed = passed + rule.passed
      //  warning = warning + rule.warning
      //  failed = failed + rule.failed
      //  inapplicable = inapplicable + rule.inapplicable
      //}
      //if (warning == 0 && failed == 0 && inapplicable == 0) {
      //  this.noErrorPage += 1
      //  return
      //}
    //}
  }

  getAtLeastOneErrorPag() {
    let count = -1;
    for (const url of this.website!.urls) {
      if (url.errorA || url.errorAA || url.errorAAA) {
        this.atLeastOneError += 1;
      }
    }
    //for (const report of this.reports) {
    //  var passed = 0;
    //  var warning = 0;
    //  var failed = 0;
    //  var inapplicable = 0;
    //  for (const rule of report.rules) {
    //    passed = passed + rule.passed
    //    warning = warning + rule.warning
    //    failed = failed + rule.failed
    //    inapplicable = inapplicable + rule.inapplicable
    //    console.log(rule);
    //  }
    //  if (warning != 0 || failed != 0 || inapplicable != 0) {
    //    this.atLeastOneError += 1
    //    return
    //  }
    //}
  }

  getAtLeastOneErrorPagA() {
    let count = -1;
    for (const url of this.website!.urls) {
      if (url.errorA) {
        this.atLeastOneError += 1;
      }
    }
    //for (const report of this.reports) {
    //  var passed = 0;
    //  var warning = 0;
    //  var failed = 0;
    //  var inapplicable = 0;
    //  for (const rule of report.rules) {
    //    passed = passed + rule.passed
    //    warning = warning + rule.warning
    //    failed = failed + rule.failed
    //    inapplicable = inapplicable + rule.inapplicable
    //    if (warning != 0 || failed != 0 || inapplicable != 0) {
    //      rule.ruleLevel = "A"
    //      this.atLeastOneErrorA += 1
    //      return
    //    }
    //  }
    //}
  }

  getAtLeastOneErrorPagAA() {
    let count = -1;
    for (const url of this.website!.urls) {
      if (url.errorAA) {
        this.atLeastOneError += 1;
      }
    }
    //for (const report of this.reports) {
    //  var passed = 0;
    //  var warning = 0;
    //  var failed = 0;
    //  var inapplicable = 0;
    //  for (const rule of report.rules) {
    //    passed = passed + rule.passed
    //    warning = warning + rule.warning
    //    failed = failed + rule.failed
    //    inapplicable = inapplicable + rule.inapplicable
    //    if (warning != 0 || failed != 0 || inapplicable != 0) {
    //      rule.ruleLevel = "AA"
    //      this.atLeastOneErrorAA += 1
    //      return
    //    }
    //  }
    //}
  }

  getAtLeastOneErrorPagAAA() {
    let count = -1;
    for (const url of this.website!.urls) {
      if (url.errorAAA) {
        this.atLeastOneError += 1;
      }
    }
    //for (const report of this.reports) {
    //  var passed = 0;
    //  var warning = 0;
    //  var failed = 0;
    //  var inapplicable = 0;
    //  for (const rule of report.rules) {
    //    passed = passed + rule.passed
    //    warning = warning + rule.warning
    //    failed = failed + rule.failed
    //    inapplicable = inapplicable + rule.inapplicable
    //    if (warning != 0 || failed != 0 || inapplicable != 0) {
    //      rule.ruleLevel = "AAA"
    //      this.atLeastOneErrorAAA += 1
    //      return
    //    }
    //  }
    //}
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
          estado: EstadoPag.PorAvaliar,
          ultima_aval: null,
          errorA: false,
          errorAA: false,
          errorAAA: false,
          nTestesPassados: -1,
          nTestesAvisos: -1,
          nTestesFalhos: -1,
          repos: []
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
    if (url._id && this.website) {
      this.websiteService.deletePagina(url._id).subscribe();
      this.website.urls = this.website.urls.filter(u => u._id !== url._id);
    }
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
    this.websiteService.iniciarAvaliacaoUrl(this.selectedUrls).subscribe(x =>
      x.forEach(newUrl => {
        console.log(newUrl);
        for (let index = 0; index < this.website!.urls.length; index++) {
          if (this.website!.urls[index].link === newUrl.link) {
            this.website!.urls[index] = newUrl
          }
        }
      },
      this.getReport()
    )); //guardar e buscar estatisticas diretamente ao urls do website
    //this.selectedUrls.forEach(newUrl => {
    //  for (let index = 0; index < this.website!.urls.length; index++) {
    //    if (this.website!.urls[index].link === newUrl.link) {
    //      this.website!.urls[index] =newUrl
    //    }
    //    
    //  }
    //});
  }

  mostrarCheckboxes() {
    this.selectedUrls = [];
    this.mostrarChecks = !this.mostrarChecks;
  }

  detalhesAval(): void {

    //TODO

  }

  gerarRelatorio(): void {

    const userChoice = confirm("Deseja gerar o relatório em PDF? Se cancelar, o relatório será gerado em HTML.");
    if (userChoice) {
        this.generatePDF();
    } else {
        const reportHTML = this.generateHTML();
        this.downloadHTML(reportHTML);
    }

  }

  downloadHTML(htmlContent: string): void {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio_de_acessibilidade.html';
    a.click();
    URL.revokeObjectURL(url);
}

generateHTML(): string {
  return `
  <html>
  <head><title>Relatório de Acessibilidade</title></head>
  <body>
      <h1>Relatório de Acessibilidade</h1>
      <ul>
          <li>Total de páginas sem erros: <span>${this.noErrorPage} (${(this.noErrorPage / this.numberOfPages * 100).toFixed(2)}%)</span></li>
          <li>Total e percentagem de páginas com pelo menos um erro de acessibilidade: <span>${this.atLeastOneError} (${(this.atLeastOneError / this.numberOfPages * 100).toFixed(2)}%)</span></li>
          <li>Total e percentagem de páginas com pelo menos um erro de acessibilidade de nível A: <span>${this.atLeastOneErrorA} (${(this.atLeastOneErrorA / this.numberOfPages * 100).toFixed(2)}%)</span></li>
          <li>Total e percentagem de páginas com pelo menos um erro de acessibilidade de nível AA: <span>${this.atLeastOneErrorAA} (${(this.atLeastOneErrorAA / this.numberOfPages * 100).toFixed(2)}%)</span></li>
          <li>Total e percentagem de páginas com pelo menos um erro de acessibilidade de nível AAA: <span>${this.atLeastOneErrorAAA} (${(this.atLeastOneErrorAAA / this.numberOfPages * 100).toFixed(2)}%)</span></li>
          <li>Lista com os 10 erros de acessibilidade mais comuns no total de todas as páginas do website avaliadas: <span></span></li>
      </ul>
      <p>Data: ${new Date().toLocaleDateString()}</p>
  </body>
  </html>`;
}


generatePDF(): void {
  const { jsPDF } = window as any;
  if (!jsPDF) {
    console.error("jsPDF is not loaded correctly");
    return;
  }
  const doc = new jsPDF();
  const reportHTML = this.generateHTML();
  doc.html(reportHTML, {
      callback: function (doc: any) {
          doc.save('relatorio_de_acessibilidade.pdf');
      }
  });
}

}
