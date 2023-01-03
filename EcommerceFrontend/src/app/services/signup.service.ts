import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Signup } from '../models/signup';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  // private logInUser: Signup | undefined = undefined;
  public logInUser: any | Signup[];
  url: string = "https://localhost:7069/api";

  constructor(private http: HttpClient) { }

  getSignUpUser(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/SignUp/User');
  }

  registerUser(signUpData: Signup) {
    return this.http.post(this.url + '/SignUp/Create', signUpData);
  }

  getLoginByUsername(username: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/LogIn' + `/${username}`);
  }

  setLoginUser(user: any) {
    this.logInUser = user;
  }

  isUserAuthenticated(): boolean {
    return this.logInUser !== undefined && this.logInUser !== null;
  }
}
