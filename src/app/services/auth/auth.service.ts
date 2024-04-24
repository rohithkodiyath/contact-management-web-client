import { Injectable } from '@angular/core';
import {RestClientService, SKIP_AUTH_HEADER} from "../restclient.service";
import {SessionService} from "../session.service";
import {LoggerService} from "../logger.service";
import {NotificationService} from "../notification.service";
import {map, Observable, tap} from "rxjs";
import {ContactModel} from "../../models/contact.model";
import {ResponseModel} from "../../models/response.model";
import {UserModel} from "../../models/user.model";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private resourceUrl = "/auth";


  constructor(private restClient: RestClientService,
              private session: SessionService,
              private logger: LoggerService,
              private notification: NotificationService ){}

  authenticate(emailAddress:string, password: string):Observable<ResponseModel<{token:string}>>{
    let url = this.resourceUrl+`/login`;
    return this.restClient.post<ResponseModel<{token:string}>>(url,{emailAddress,password}, SKIP_AUTH_HEADER).pipe(
        tap((response)=>{
            this.session.setToken(response.data.token);
        })
    );
  }


  register(userModel : UserModel):Observable<ResponseModel<{token:string}>>{
    let url = this.resourceUrl+`/register`;
    return this.restClient.post<ResponseModel<{token:string}>>(url, userModel,SKIP_AUTH_HEADER);
  }

  resetPassword(userModel : UserModel):Observable<ResponseModel<{token:string}>>{
    let url = this.resourceUrl+`/register`;
    return this.restClient.post<ResponseModel<{token:string}>>(url, userModel,SKIP_AUTH_HEADER);
  }





}
