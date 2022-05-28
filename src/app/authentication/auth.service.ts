import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData } from '../interfaces/auth-data';
import { LoginData } from '../interfaces/login-data';
import { SignupData } from '../interfaces/signup-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  //Parte del behavior subject per il login non viene usata in quanto uso direttamente il token dall'environment
  //volendo implementabile
  private authSubject = new BehaviorSubject<null | AuthData>(null)
  user$ = this.authSubject.asObservable()
  isLoggedIn = this.user$.pipe(map(user => !!user))

  signup(formData: SignupData) {
    return this.http.post(environment.serverAddress + "/api/auth/signup", formData)
  }
  login(formData: LoginData) {
    return this.http.post<AuthData>(environment.serverAddress + "/api/auth/login", formData).pipe(tap(
      (data) => { this.authSubject.next(data) })
    );
  }
  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('user')
    this.router.navigate(['/'])
  }
  user: any
  guard(): boolean {
    let userJson = localStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson)
      return true
    }
    else { return false }
  }
}
