import {

    HttpEvent,

    HttpInterceptor,

    HttpHandler,

    HttpRequest,

    HttpResponse,

    HttpErrorResponse

} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                retry(3),
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        console.error('This is client side error');
                        errorMsg = `Error: ${error.error.message}`;
                    } else {
                        console.error('This is server side error');
                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    }
                    alert(errorMsg);
                    return throwError(errorMsg);
                })
            )
    }

}