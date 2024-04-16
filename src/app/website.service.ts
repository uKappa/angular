import { Injectable } from '@angular/core';
import { Website } from "./website";
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  httpURL = "http://localhost:3000/catalog/websites"

  constructor(private http: HttpClient) { }

  getWebsites(): Observable<Website[]>{
    return this.http.get<Website[]>("http://localhost:3000/catalog/websites").pipe();
  }

}
