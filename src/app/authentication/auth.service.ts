import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData } from '../interfaces/auth-data';
import { LoginData } from '../interfaces/login-data';
import { SignupData } from '../interfaces/signup-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private authSubject = new BehaviorSubject<null| AuthData>(null)
  user$ = this.authSubject.asObservable()


  signup(formData:SignupData){
    return this.http.post(environment.serverAddress + "/api/auth/signup", formData)
  }
  login(formData:LoginData){
    return this.http.post<AuthData>(environment.serverAddress + "/api/auth/login", formData).pipe(tap(
      (data)=>{this.authSubject.next(data)})

      );
  }
}
