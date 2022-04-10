import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApplicationForm } from './behavior-subject.service';
import { City } from './organization-cache.service';

export interface ObjectType {
  [k:string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getClientIpInfo(): Observable<any> {
    return this.#get('https://api.ipgeolocation.io/ipgeo', { apiKey: environment.ipgeolocationApiKey });
  }

  public getCitiesInfo(): Observable<City[]> {
    return this.#get(`${environment.apiUrl}api/client/cities`)
  }

  public getCodeForEmailVerify(email: string): Observable<void> {
    return this.#post(`${environment.apiUrl}api/client/code/send`, { email })
  }

  public sendVerifyCode(email: string, verificationCode: string): Observable<void> {
    return this.#post(`${environment.apiUrl}api/client/code/verify`, { email, verificationCode });
  }

  public sendApplication(body: ApplicationForm): Observable<void> {
    return this.#post(`${environment.apiUrl}api/client/addHumanRequest`, body);
  }

  public sendFile(fileFormData: FormData): Observable<void> {
    return this.#post(`${environment.apiUrl}`, fileFormData)
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
