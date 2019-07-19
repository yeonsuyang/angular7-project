import { Component } from '@angular/core';
import { authConfig } from './service/auth/auth-config';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angular7-project';

    constructor(private oauthService: OAuthService) {
        // oauthService setting
        this.oauthService.configure(authConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.tryLogin();
    }
}
