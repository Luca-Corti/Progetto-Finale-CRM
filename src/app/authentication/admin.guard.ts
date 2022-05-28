import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authSrv:AuthService, private router:Router){
  }
  role= 'ROLE_ADMIN'
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //L'uguaglianza diretta user.roles==['ROLE_ADMIN'] non funziona, quindi faccio il pop salvo la stringa,
    //In teoria un utente dovrebbe avere ruolo ADMIN o USER e non entrambi visto che un admin è un tipo di user
      let ruolo=this.authSrv.user.roles.pop()
      if(ruolo==this.role){
      return true
    }
    else{
      return this.router.createUrlTree(['/home'])
    }
  }

}
