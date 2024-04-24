import { Injectable } from '@angular/core';
import {RestClientService} from "../restclient.service";
import {SessionService} from "../session.service";
import {LoggerService} from "../logger.service";
import {NotificationService} from "../notification.service";
import {map, Observable, tap} from "rxjs";
import {ContactModel} from "../../models/contact.model";
import {ResponseModel} from "../../models/response.model";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private resourceUrl = "/contact";

  constructor(private restClient: RestClientService,
              private session: SessionService,
              private logger: LoggerService,
              private notification: NotificationService ){}

    listContacts(page?: number, searchKey?: string, sortField?: string, sortOrder?: string):Observable<{
      list: ContactModel[];
      totalPage: number
  }>{
    let url = this.resourceUrl+`/list?p=${page ? page : 0}`;
    if(searchKey){
      url += `&q=${searchKey}`;
    }
    if(sortField){
      url += `&sortKey=${sortField}`;
    }
    if(sortOrder){
      url += `&sortOrder=${sortOrder}`;
    }
    return this.restClient.get<{contacts : {data:ContactModel}[], totalPages : number}>(url)
        .pipe(tap(d=>console.warn("Data input",d)),map(d =>
            ({list: d.contacts.map(m=>m.data), totalPage: d.totalPages})));
  }

  getContact(uuid:string):Observable<ResponseModel<ContactModel>>{
    let url = this.resourceUrl+`/${uuid}`;
    return this.restClient.get<ResponseModel<ContactModel>>(url);
  }

  createContact(data:ContactModel):Observable<ResponseModel<{uuid:string}>>{
    let url = this.resourceUrl;
    return this.restClient.post<ResponseModel<{uuid:string}>>(url, data);
  }

  updateContact(data:ContactModel):Observable<ResponseModel<{uuid:string}>>{
    let url = this.resourceUrl;
    return this.restClient.put<ResponseModel<{uuid:string}>>(url, data);
  }

  deleteContact(uuid:string):Observable<ResponseModel<{uuid:string}>>{
    let url = this.resourceUrl+"/"+uuid;
    return this.restClient.delete<ResponseModel<{uuid:string}>>(url);
  }


  //
  // upseartContact(page? : number, size?:number):Observable<{list:ContactModel[],totalPage : number}>{
  //   let url = this.resourceUrl+`list?p=${page ? 0 : page} s=${size ? 10 : size}`;
  //   return this.restClient.get<{contacts : {data:ContactModel[]}, totalPages : number}>(url)
  //       .pipe(map(d => ({list: d.contacts.data, totalPage: d.totalPages})));
  // }
  //
  // deleteContact(page? : number, size?:number):Observable<{list:ContactModel[],totalPage : number}>{
  //   let url = this.resourceUrl+`list?p=${page ? 0 : page} s=${size ? 10 : size}`;
  //   return this.restClient.get<{contacts : {data:ContactModel[]}, totalPages : number}>(url)
  //       .pipe(map(d => ({list: d.contacts.data, totalPage: d.totalPages})));
  // }

}
