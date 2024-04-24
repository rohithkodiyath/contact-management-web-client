import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {NotificationService} from "../../services/notification.service";
import {LoggerService} from "../../services/logger.service";
import {UserModel} from "../../models/user.model";
import CustomValidators from "../../validators/CustomValidators";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private route: ActivatedRoute,private router: Router, private authService: AuthService,
              private notificationService: NotificationService,
              private logger: LoggerService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerForm = new FormGroup({
      'firstName': new FormControl(null,[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      'lastName': new FormControl(null,[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      'emailAddress': new FormControl(null,[Validators.required,Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
      'confirmPassword': new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
    },{
      validators:CustomValidators.matchPassword("password", "confirmPassword")
    });
  }

  submitForm() {
    if (this.registerForm.valid) {
      let userToRegister:UserModel = this.registerForm.value
      this.authService.register(userToRegister).subscribe({
        next: (data) => {
          this.notificationService.success('User registered successfully');
          this.router.navigate(['/auth']);
        },
        error: (error : HttpErrorResponse) => {
          this.notificationService.handleErrorMessage(error);
        }
      });
    }
  }


}
