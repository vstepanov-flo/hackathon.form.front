import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ObjectType {
  [k:string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getCity(): Observable<any> {
    return this.#get('https://api.ipgeolocation.io/ipgeo', { apiKey: environment.ipgeolocationApiKey });
  }

  #get<T>(url:string, params?: ObjectType): Observable<T> {
    return this.httpClient.get<T>(url, {
      params
    });
  }

  #post<T>(url:string, body: any): Observable<T> {
    return this.httpClient.post<T>(url, body);
  }
}
