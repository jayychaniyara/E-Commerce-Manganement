import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Signup } from '../models/signup';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../services/signup.service';
import { Router } from '@angular/router';
import { EncrDecrService } from '../services/encr-decr.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  existUserList: any[] = [];
  registerForm!: FormGroup; // property form

  constructor(public signUpService: SignupService, private fb: FormBuilder, private route: Router, public encrDecrService: EncrDecrService) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    });
  }

  ngOnInit(): void {
    this.signUpService.getSignUpUser().subscribe(data => {
      this.existUserList = data;
    });
  }

  // get f() { return this.registerForm.controls; }

  registerUser() {

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      alert('Password not matched');
      return;
    }

    this.encrDecrService.encryptUsingAES256(this.registerForm.value.password);
    // console.log(this.encrDecrService.decryptUsingAES256(this.encrDecrService.encryptUsingAES256(this.registerForm.value.password)));

    const userInfo: Signup = {
      'id': 0,
      'firstName': this.registerForm.value.firstName,
      'lastName': this.registerForm.value.lastName,
      'email': this.registerForm.value.email,
      'password': this.encrDecrService.encryptUsingAES256(this.registerForm.value.password),
      'username': this.registerForm.value.username,
      'contactNumber': this.registerForm.value.contactNumber,
      'gender': this.registerForm.value.gender,
    };

    this.signUpService.registerUser(userInfo).subscribe(data => {
      alert("saved");
      this.route.navigate(['']);
      this.resetTheForm();
    });

  }

  resetTheForm(): void {
    this.registerForm.reset();
  }

}
