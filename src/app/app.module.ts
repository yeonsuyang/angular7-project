import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OAuthModule } from 'angular-oauth2-oidc';
import { OAuthService } from 'angular-oauth2-oidc';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatCheckboxModule } from '@angular/material';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ModalModule } from 'ngx-bootstrap/modal';

// basic
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// page
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AlertModalComponent } from './partial/alertModal/alertModal.component';
import { HeaderComponent } from './partial/header/header.component';

// service
import { ErrorInterceptor } from './service/interceptor/error.interceptor';
import { ApiService } from './service/api.service';
import { PagerService } from './service/page.service';
import { AuthService } from './service/auth/auth.service';
import { AlertModalService } from './service/alertModal.service';
import { AuthGuard } from './service/auth/auth-guard.service';

// config
import { AppConfig } from './app.config';
import { JwtModule } from '@auth0/angular-jwt';

export function loadConfigurations(config: AppConfig): (() => Promise<boolean>) {
    return (): Promise<boolean> => {
        return config.getConfigs();
    };
} // 가장 먼저 불러오게 하는 방법.  // docker run 등 api_uri를 지정하기 위한 설정

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MainComponent,
        AlertModalComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        OAuthModule.forRoot(),
        ModalModule.forRoot(),
        NgbModule,
        NgxDaterangepickerMd.forRoot(),
        BrowserAnimationsModule,
        MatDialogModule,
        MatCheckboxModule,
        LoggerModule.forRoot({
            level: NgxLoggerLevel.TRACE,
            serverLogLevel: NgxLoggerLevel.ERROR,
            disableConsoleLogging: false
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: [window.location.origin],
                blacklistedRoutes: [window.location.origin + '/login']
            }
        })
    ],
    exports: [
        AlertModalComponent
    ],
    entryComponents: [
        AlertModalComponent,
    ],
    providers: [
        OAuthService,
        AuthService,
        AuthGuard,
        PagerService,
        ApiService,
        AlertModalService,
        DatePipe,
        AppConfig,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        {
            provide: APP_INITIALIZER,
            useFactory: loadConfigurations,
            deps: [AppConfig],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
