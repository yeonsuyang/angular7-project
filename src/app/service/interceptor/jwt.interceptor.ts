import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './../auth/auth.service';

@Injectable()

//JWT 인터셉터는 사용자가 로그인 한 경우 Authorization 헤더에 JWT 인증 토큰을 추가하기 위해 애플리케이션의 HTTP 요청을 차단합니다.
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService:  AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authService.getDecodeLocalToken();
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}