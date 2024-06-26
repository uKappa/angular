import { Injectable } from '@angular/core';
import { Website } from "./website";
import { interval, Observable, of, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Url } from './url';
import { Repo } from './repo';
import { Rule } from './rule';


@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  httpURL = "http://10.101.151.25:3058/catalog"
  //httpURL = "http://localhost:3000/catalog"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private intervalSubscription: Subscription | undefined;

  constructor(private http: HttpClient) { }


  getWebsite(_id: Object): Observable<Website> {
    const url = `${this.httpURL}/website/${_id}`;
    return this.http.get<Website>(url).pipe();
  }

  getUrl(_id: Object): Observable<Url> {
    const url = `${this.httpURL}/url/${_id}`;
    return this.http.get<Url>(url).pipe();
  }

  getRules(_id: Repo): Observable<Rule[]> {
    return this.http.get<Rule[]>(`${this.httpURL}/rules/${_id}`).pipe();
  }

  getWebsites(): Observable<Website[]>{
    return this.http.get<Website[]>(`${this.httpURL}/websites`).pipe();
  }

  getReport(_id: Object): Observable<Repo>{
    const url = `${this.httpURL}/website/report/${_id}`;
    return this.http.get<Repo>(url).pipe();
  }

  addWebsite(url: Url): Observable<Website> {
    console.log(url)
    return this.http.post<Website>(`${this.httpURL}/website/create`, url, this.httpOptions)
  }

  updateWebsite(website: Website): Observable<any>{
    return this.http.put(`${this.httpURL}/website/update`, website, this.httpOptions)
  }

  deleteWebsite(_id: Object): Observable<Website> {
    return this.http.delete<Website>(`${this.httpURL}/website/delete/${_id}`, this.httpOptions)
  }

  iniciarAvaliacao(selectedWebsites: Website[]): Observable<Website[]>{
    return this.http.put<Website[]>(`${this.httpURL}/website/evaluate_website`, selectedWebsites, this.httpOptions).pipe()
  }

  iniciarAvaliacaoUrl(selectedUrls?: Url[]): Observable<Url[]>{
    return this.http.put<Url[]>(`${this.httpURL}/website/evaluate_url`, selectedUrls, this.httpOptions).pipe()
  }

  deletePagina(_id: Object): Observable<Url> {
    return this.http.delete<Url>(`${this.httpURL}/pagina/delete/${_id}`, this.httpOptions)
  }
  
}

