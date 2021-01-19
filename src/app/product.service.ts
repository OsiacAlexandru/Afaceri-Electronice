import { Injectable } from '@angular/core';
 
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Catalog} from './catalog';
 
@Injectable()
export class ProductService {
 
  baseURL: string = 'http://' + window.location.hostname + ':8080/products';
 
  constructor(private http: HttpClient) {
  }
 
  getAllProducts(): Observable<any> {
    console.log(this.baseURL);
    return this.http.get(this.baseURL);
  }
  
  addProduct(catalog:Catalog): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(catalog);
    console.log(body)
    return this.http.post(this.baseURL, body,{'headers':headers})
  }
 
}