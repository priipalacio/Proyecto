import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/clients';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

   myAppUrl:string = "https://localhost:44345/api/client/";
   urlProv: string = "https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre";
   urlLocal: string = ' https://apis.datos.gob.ar/georef/api/localidades';

   
  constructor(private httpClient: HttpClient) { }

  get(): Observable<any> {
    return this.httpClient.get(this.myAppUrl);
  }

  post(cl: Client): Observable<any>{
    return this.httpClient.post(this.myAppUrl, cl);
  }

  put(cl: Client, id: number): Observable<any>
  {
    return this.httpClient.put(this.myAppUrl + id, cl);
  }

  delete(Id): Observable<any>
  {
  return this.httpClient.delete(this.myAppUrl + Id);
  }


  getProvi(): Observable<any>{   
    return this.httpClient.get<any>(this.urlProv);
 }

 getCity(): Observable<any>{
  //  var newUrl = `${this.url}=name`;
    
  return this.httpClient.get<any>(this.urlLocal);
}
}
