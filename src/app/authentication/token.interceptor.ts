import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authSrv:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //return this.authSrv.user$.pipe(take(1),switchMap(user =>{
      const newReq= request.clone({headers: request.headers
      .set("Authorization", `Bearer ${environment.adminToken}`)
      .set("X-TENANT-ID", environment.tenantId)})
    //}))
    return next.handle(newReq);
  }
}
