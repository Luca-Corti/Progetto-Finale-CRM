import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authSrv: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let ok: string
    const newReq: HttpRequest<any> = request.clone({
      headers: request.headers
        .set("Authorization", `Bearer ${environment.adminToken}`)
        .set("X-TENANT-ID", environment.tenantId),
    });

    return next.handle(newReq).pipe(tap((event) => {
      ok = event instanceof HttpResponse ? 'succeeded' : '';
    },
      (error) => { }
    ),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }),
      finalize(() => { })
    );
  }
}
