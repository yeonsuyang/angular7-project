import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';
import { AlertModalService } from './../alertModal.service';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

// HttpInterceptor 클래스를 확장하면 사용자 정의 인터셉터를 생성하여 서버의 모든 오류 응답을 단일 위치에서 catch 할 수 있습니다.
/* 오류 인터셉터는 api에서 http 응답을 가로 채서 오류가 있는지 확인합니다. 
401 Unauthorized 응답이있는 경우 사용자는 응용 프로그램에서 
자동으로 로그 아웃되고 다른 모든 오류는 호출 서비스에 의해 잡히도록 다시 던져 지므로 경고가 사용자에게 표시 될 수 있습니다.
*/
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private alertModalService: AlertModalService,
                private logger: NGXLogger) { }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(retry(1), catchError(err => {

            let data = {};
            let errorMessage = '';

            this.logger.info(err.message);

            if (err.status === 401) {
                errorMessage = err.status;
                this.authService.logout();
                return throwError(errorMessage);
            }

            if (err.error instanceof ErrorEvent) {
                // client-side error
                data = {
                    reason: '동작을 실패하였습니다.',
                    status: err.status
                };
            } else {// server-side error
                data = {
                    reason: '요청에 실패하였습니다.',
                    status: err.status
                };
            }

            this.alertModalService.confirmThis('error', data, function () {
                this.logger.info(err.message);
            }, function () {
                this.logger.info(err.message);
            });

            return throwError(errorMessage);
        }));
    }

}
