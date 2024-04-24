import { Injectable } from '@angular/core';
import {UserModel} from "../models/user.model";

export enum StorageKey {
    TOKEN = 'token',
    USER = 'logged_user',
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  public getToken(): string {
    return this.retrieveData(StorageKey.TOKEN);
  }

  public setToken(token: string): void {
    this.storeData(StorageKey.TOKEN,token);
  }

  public clearToken(): void {
    this.removeData(StorageKey.TOKEN);
  }

  public getUser(): string {
    return this.retrieveData(StorageKey.USER);
  }

  public setUser(user: UserModel): void {
    this.storeData(StorageKey.USER,user);
  }

  public clearUser(): void {
    this.removeData(StorageKey.USER);
  }

  public clearSession(): void {
    this.clearToken();
    this.clearUser();
  }

  private storeData<T>(token :StorageKey,data: T ): void {
     localStorage.setItem(token, JSON.stringify(data));
  }

  private retrieveData<T>(token :StorageKey): T {
    let stringValue = localStorage.getItem(token);
    return JSON.parse(stringValue);
  }

  private removeData(token :StorageKey): void {
    localStorage.removeItem(token);
  }






}
