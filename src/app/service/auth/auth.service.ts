import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/app.config';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {


    jwtHelper: JwtHelperService = new JwtHelperService();
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private autorities: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    authUrl: string;

    constructor(
        private oauthService: OAuthService,
        private router: Router, private http: HttpClient, private config: AppConfig) { this.authUrl = config.getConfig('mgmt_api'); }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    get isSupervisor() {
        return this.autorities.asObservable();
    }


    login(username: string, password: string) {
        if (username === 'admin' && password === '1234') {
            localStorage.setItem('user', username);
            return true;
        } else {
            return false;
        }
    }

    // login : authenticate > initImplicitFlow
    /* login(username: string, password: string) {
        const basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

        let requestOptions: Object = {
           //  headers: new HttpHeaders().set('Authorization', basicAuthHeaderString).set('Accept', '-*-/-*'),
            observe: 'response',
            withCredentials: true
        };
        const url = this.authUrl + 'mgmt/v1/forauthenticate';

        return this.http.get<any>(url, requestOptions);
    } */


    // initImplicitFlow
    getToken() {
        this.oauthService.initImplicitFlow();
    }

    setAutorities() {
        if (this.getDecodeLocalToken().authorities[0] === 'SUPERVISOR') {
            this.autorities.next(true);
        } else {
            this.autorities.next(false);
        }
    }

    setloggedIn() {
        this.loggedIn.next(true);
    }


    setloggedOut() {
        this.loggedIn.next(false);
    }

    get givenName() {
        const claims = this.oauthService.getIdentityClaims();
        if (!claims) {
            return null;
        }
        return ' ';
    }

    // token decoding
    getDecodeLocalToken() {
        const token = localStorage.getItem('access_token');
        return this.jwtHelper.decodeToken(token);
    }

    getDecodeSessionToken() {
        const token = this.getAccessToken();
        return this.jwtHelper.decodeToken(token);
    }

    // tokene expired : true , not expired : false
    getTokenExpired() {
        return this.jwtHelper.isTokenExpired(localStorage.getItem('access_token'));
    }

    // login : true , logout : false
    isUserLoggedIn() {
        return localStorage.getItem('userInfo') !== undefined && localStorage.getItem('userInfo') !== null;
    }

    // logout
    logout() {
        // localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        // this.oauthService.logOut();
        this.router.navigate(['/login']);
        location.reload();
    }

    // get token
    getAccessToken() {
        return this.oauthService.getAccessToken();
    }

    // has valid token = true, not valid = false
    checkSessionToken() {
        return this.oauthService.hasValidAccessToken();
    }

    getLocalAccessToken() {
        return localStorage.getItem('access_token');
    }

    // Check existence.
    //  have local token = true, not have = false
    checkLocalToken() {
        return localStorage.getItem('access_token') !== null;
    }

    // havs user id = true, not has = false
    checkhasUserId() {
        return localStorage.getItem('ID') !== undefined && localStorage.getItem('ID') !== null;
    }
}
