import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";


export enum LogLevel {
    DEBUG,
    INFO,
    WARN,
    ERROR
}


@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  warn(...message: any[]) {
    this.logMessage(LogLevel.WARN,...message);
  }

  log(...message: any[]) {
    this.logMessage(LogLevel.INFO,...message);
  }

  error(...message: any[]) {
    this.logMessage(LogLevel.ERROR,...message);
  }

  debug(...message: any[]) {
    this.logMessage(LogLevel.DEBUG,...message);
  }

  info(...message: any[]) {
    this.logMessage(LogLevel.INFO,...message);
  }

  private logMessage(level: LogLevel, ...message: any[]) {
    if(LogLevel[environment.logLevel] > level){
        return;
    }
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(...message);
        break;
      case LogLevel.INFO:
        console.info(...message);
        break;
      case LogLevel.WARN:
        console.warn(...message);
        break;
      case LogLevel.ERROR:
        console.error(...message);
        break;
    }
  }


}
