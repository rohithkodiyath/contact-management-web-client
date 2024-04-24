import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from "./containers/landing/landing.component";
import {ContactListComponent} from "./contact-list/contact-list.component";
import {ContactEditComponent} from "./contact-edit/contact-edit.component";
import {LoginComponent} from "./auth/login/login.component";
import {AuthComponent} from "./containers/auth/auth.component";
import {RegisterComponent} from "./auth/register/register.component";
import {Authguard} from "./auth/guard/authguard.service";

const routes: Routes =[
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  { path: 'landing',        component: LandingComponent , canActivate: [Authguard],
    children: [
      { path: '',      component: ContactListComponent },
      { path: 'contact-edit/:uuid',      component: ContactEditComponent  },
    ]
  },
  { path: 'auth',        component: AuthComponent,
    children:[
      { path: '',      component: LoginComponent},
      { path: 'new',      component: RegisterComponent  },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
