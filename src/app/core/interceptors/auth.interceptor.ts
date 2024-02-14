import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class authInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authRequest = req.clone(
      {
        setHeaders: {
          'Authorization': this.cookieService.get('Authorization')
        }
      }
    );

    return next.handle(authRequest);

  }

}
