import { Component, Input } from '@angular/core';
import { Website } from '../website';
import { WebsiteService } from '../website.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-website-detail',
  templateUrl: './website-detail.component.html',
  styleUrl: './website-detail.component.css'
})
export class WebsiteDetailComponent {

  @Input() website? : Website;

  @Input() newUrl?: String;

  constructor(private websiteService: WebsiteService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getWebsite();
  }


  getWebsite() {
    const id = Object(this.route.snapshot.paramMap.get('_id'));
    this.websiteService.getWebsite(id).subscribe(x => this.website = x)
  }


  addUrl(): void {
    if (this.newUrl && this.website) {
      this.website.urls.push(this.newUrl);
      this.websiteService.updateWebsite(this.website).subscribe(() => {
      // Atualize o website no servidor (se necessário)
      console.log('URL adicionada com sucesso:', this.newUrl);
      });
    } else {
      console.log('Por favor, insira uma URL válida.');
    }
  }


}
