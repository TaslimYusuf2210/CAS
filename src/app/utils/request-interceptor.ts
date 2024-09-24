import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AppException } from './http-exceptions';
import { Store } from '../constants/generic-enums';
import { decrypt } from './crypto-util';
import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, PLATFORM_ID } from '@angular/core';
import { IAuthData } from '../models/loginViewModel';
import { AuthService } from '../services/auth.service';

export const interceptHeaders: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const user = inject(AuthService).currentUser;
  const token = user !== null ? user.token : null;
  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      'Referrer-Policy': 'no-referrer',
    },
  });

  return next(modifiedReq).pipe(
    catchError((err: any) => throwError(() => new AppException(err)))
  );
};
