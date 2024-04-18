import { Injectable } from '@angular/core';
import { Website } from "./website";
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  httpURL = "http://localhost:3000/catalog/websites"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }

  getWebsite(_id: Object): Observable<Website> {
    const url = `http://localhost:3000/catalog/website/${_id}`;
    return this.http.get<Website>(url).pipe();
  }

  getWebsites(): Observable<Website[]>{
    return this.http.get<Website[]>("http://localhost:3000/catalog/websites").pipe();
  }

  addWebsite(website: Website): Observable<Website> {
    return this.http.post<Website>("http://localhost:3000/catalog/website/create", website, this.httpOptions)
  }

  updateWebsite(website: Website): Observable<any>{
    return this.http.put("http://localhost:3000/catalog/website/update", website, this.httpOptions) //modar url
  }

  
}

