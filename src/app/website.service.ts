import { Injectable } from '@angular/core';
import { Website } from "./website";
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Url } from './url';


@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  httpURL = "http://localhost:3058/catalog"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }

  getWebsite(_id: Object): Observable<Website> {
    const url = `${this.httpURL}/website/${_id}`;
    return this.http.get<Website>(url).pipe();
  }

  getWebsites(): Observable<Website[]>{
    return this.http.get<Website[]>(`${this.httpURL}/websites`).pipe();
  }

  addWebsite(url: Url): Observable<Website> {
    console.log(url)
    return this.http.post<Website>(`${this.httpURL}/website/create`, url, this.httpOptions)
  }

  updateWebsite(website: Website): Observable<any>{
    return this.http.put(`${this.httpURL}/website/update`, website, this.httpOptions) //modar url
  }

  
}

