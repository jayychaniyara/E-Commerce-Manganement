import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from '../models/signup';
import { EncrDecrService } from '../services/encr-decr.service';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public matchUserData: any | Signup[];
  loginForm!: FormGroup; // property form

  constructor(public signUpService: SignupService, private fb: FormBuilder, private route: Router, public encrDecrService: EncrDecrService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    });
  }


  ngOnInit(): void {
  }

  loginUser() {
    const checkUserName = this.loginForm.get('username')?.value;
    const checkPassword = this.loginForm.get('password')?.value;

    this.signUpService.getLoginByUsername(checkUserName).subscribe(data => {
      this.matchUserData = data;
      console.log(this.matchUserData.password)
      console.log(this.encrDecrService.decryptUsingAES256(this.matchUserData.password));


      if (this.encrDecrService.decryptUsingAES256(this.matchUserData.password) != checkPassword) {
        alert("Incorrect password");
      }
      else {
        this.signUpService.setLoginUser(this.matchUserData);
        this.route.navigate(['/homePage', this.matchUserData.id]);
      }
    }, (error: HttpErrorResponse) => {
      alert("username does not exist");
    });

    this.resetTheForm();
  }

  resetTheForm(): void {
    this.loginForm.reset();
  }
}
