import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebsitesComponent } from './websites/websites.component';
import { FormsModule } from '@angular/forms';
import { WebsiteDetailComponent } from './website-detail/website-detail.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { WebsiteAcessibilidadeComponent } from './website-acessibilidade/website-acessibilidade.component';

@NgModule({
  declarations: [
    AppComponent,
    WebsitesComponent,
    WebsiteDetailComponent,
    WebsiteAcessibilidadeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
