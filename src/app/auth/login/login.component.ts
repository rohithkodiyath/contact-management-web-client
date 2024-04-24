import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ContactService} from "../../services/contact/contact.service";
import {NotificationService} from "../../services/notification.service";
import {LoggerService} from "../../services/logger.service";
import {AuthService} from "../../services/auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactModel} from "../../models/contact.model";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private route: ActivatedRoute,private router: Router, private authService: AuthService,
              private notificationService: NotificationService,
              private logger: LoggerService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = new FormGroup({
          'password': new FormControl(null,[Validators.required]),
          'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }

  submitForm() {
    if (this.loginForm.valid) {

      let email = this.loginForm.get('email').value;
      let password = this.loginForm.get('password').value;

      this.authService.authenticate(email, password).subscribe({
        next: (data) => {
            this.router.navigate(['/landing']);
        },
        error: (error) => {
          this.notificationService.handleErrorMessage(error);
        }
      });
    }
  }

}
