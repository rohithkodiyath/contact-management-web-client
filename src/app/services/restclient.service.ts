import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from "rxjs";
import {LoggerService} from "./logger.service";
import {environment} from "../../environments/environment";
import {ResponseModel} from "../models/response.model";

export const  SKIP_AUTH_HEADER :  HttpHeaders = new HttpHeaders().set('skip_auth', 'true');

@Injectable({
  providedIn: 'root'
})
export class RestClientService {

  private BASE_URL = environment.baseUrl;

  constructor(private http: HttpClient, private logger : LoggerService) { }

  get<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.extractData<T>('get',url,null, headers);
  }

  post<T>(url: string, data: any, headers?: HttpHeaders): Observable<T> {
    return this.extractData<T>('post',url, data, headers);
  }

  put<T>(url: string, data: any, headers?: HttpHeaders): Observable<T> {
    return this.extractData<T>('put',url, data, headers);
  }

  delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.extractData<T>('delete',url, headers);
  }

  private extractData<T>(method: string, url: string, data?: any,  headers?:HttpHeaders):Observable<T>{
    let urlToUse = this.BASE_URL + url;
    return this.http.request<T>(method, urlToUse, { headers:headers,body:data}).pipe(
        catchError(error=>{
            this.logger.error('Error in RestClientService', error);
            return throwError(error);
        })
    );
  }




}
