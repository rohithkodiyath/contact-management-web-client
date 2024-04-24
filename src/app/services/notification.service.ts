import {Component, Inject, Injectable} from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {LoggerService} from "./logger.service";


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar, private logger : LoggerService) { }


  error(message: string){
    this.openSnackBar(message, 'close', true);
  }

  success(message: string){
    this.openSnackBar(message, 'close');
  }

  openSnackBar(message: string, action: string = 'close' , isError: boolean = false){
    this.snackBar.openFromComponent(NotificationBannerComponent, {
      data: {message: message, title: isError ? 'Error' : 'Success', isError: isError},
      duration: 2000, // Adjust the duration as needed
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'top',
        panelClass: ['success-snack-bar']
    });
  }

  handleErrorMessage(error: HttpErrorResponse) {
    let errorBody = error.error;
    console.error(errorBody);
    if(error.status == 500){
      this.error('Internal Server Error');
    }else if(errorBody?.body?.validationErrors){
      this.error('Validation Errors: ' + errorBody?.body?.validationErrors.join(', '));
    } else if(errorBody?.body?.detail){
      this.error('Error: ' + errorBody.body.detail);
    }else{
      this.logger.error('An error occurred', errorBody);
    }
  }
}


@Component({
  selector: 'notification-banner',
  template: `
    <div class="alert" [ngClass]="{'alert-success':!data.isError,'alert-danger':data.isError}" style = "margin-bottom: auto">
      <button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <i class="material-icons">close</i>
      </button>
<!--        <span class="material-icons">check_circle</span>-->
      {{data?.message}}
    </div>
  `
})
export class NotificationBannerComponent {
  constructor(
      @Inject(MAT_SNACK_BAR_DATA) public data: {message: string, isError : boolean, title?: string}
  ) { }

  protected readonly JSON = JSON;
}