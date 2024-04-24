import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './containers/landing/landing.component';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { ContactListComponent } from './contact-list/contact-list.component';
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { LoginComponent } from './auth/login/login.component';
import {MatCardModule} from "@angular/material/card";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NotificationBannerComponent} from "./services/notification.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import { AuthComponent } from './containers/auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import {AuthInterceptor} from "./auth/interceptor/auth";
import {MatSortModule, Sort} from '@angular/material/sort';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
    MatDividerModule,
    MatSortModule
  ],
  declarations: [
    AppComponent,
    LandingComponent,
    ContactListComponent,
    ContactEditComponent,
    LoginComponent,
    NotificationBannerComponent,
    AuthComponent,
    RegisterComponent

  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
