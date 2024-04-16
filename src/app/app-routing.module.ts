import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsitesComponent } from './websites/websites.component';

const routes: Routes = [
  { path: 'websites', component: WebsitesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
