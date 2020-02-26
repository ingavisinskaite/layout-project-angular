import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ErrorService } from '../services/error.service';
import { NotificationsService } from '../services/notifications.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private errorService: ErrorService,
    private notifier: NotificationsService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        const message = this.errorService.getMessage(error);
        this.notifier.showError(message);
        console.log(error);
        return throwError(error);
      })
    );
  }
}
