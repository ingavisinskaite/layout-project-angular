import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injector, Injectable } from '@angular/core';
import { ErrorService } from '../services/error.service';
import { NotificationsService } from '../services/notifications.service';
import { NavigationService } from '../services/navigation.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  errorService = this.injector.get(ErrorService);
  notifier = this.injector.get(NotificationsService);
  message: any;
  stackTrace: any;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          this.message = this.errorService.getServerMessage(error);
          this.stackTrace = this.errorService.getServerStack(error);
          this.notifier.showError(this.message);
        } else {
          this.message = this.errorService.getClientMessage(error);
          this.stackTrace = this.errorService.getClientStack(error);
          this.notifier.showError(this.message);
        }
        console.log(error);
        return throwError(error);
      })
    );
  }
}
