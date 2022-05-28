import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private authSrv: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //fa l'esatto opposto della guardia normale, se c'è un utente loggato rimanda in homepage, obbligando il logout
    if (this.authSrv.guard()) {
      alert("Sei già loggato, fai logout per accedere a questa pagina!")
      return this.router.createUrlTree(['/home'])
    }
    else {
      return true
    }
  }
}
