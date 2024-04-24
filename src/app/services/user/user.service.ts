import { Injectable } from '@angular/core';
import {SessionService} from "../session.service";
import {LoggerService} from "../logger.service";
import {NotificationService} from "../notification.service";
import {RestClientService} from "../restclient.service";
import {Observable, tap} from "rxjs";
import {ResponseModel} from "../../models/response.model";
import {UserModel} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private resourceUrl = "/user";

  constructor(private restClient: RestClientService,
              private session: SessionService,
              private logger: LoggerService,
              private notification: NotificationService ){}


  getUser():Observable<ResponseModel<UserModel>>{
    let url = this.resourceUrl+`/me`;
    return this.restClient.get<ResponseModel<UserModel>>(url).pipe(
        tap((response)=>{
            this.session.setUser(response.data);
        })
    );
  }


}
