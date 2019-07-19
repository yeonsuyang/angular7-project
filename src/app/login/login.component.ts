import { AuthService } from '../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { MustMatch } from '../service/pwvalidator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    username: string;
    password: string;
    confirmpw: string;
    rememberId = false;
    loginFailed = false;

    constructor(
        private authService: AuthService, private logger: NGXLogger, private router: Router, private formBuilder: FormBuilder) {
        if (this.authService.checkhasUserId()) {
            this.username = localStorage.getItem('ID');
            this.rememberId = true;
        }
    }

    ngOnInit() {
        this.logger.info('LoginComponent init');
        this.loginForm = this.formBuilder.group({ // Validators.email
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            confirmpw: ['', [Validators.required]]
        }, {
                // Here we create validators to be used for the group as a whole
                validator: MustMatch('password', 'confirmpw')
            }
        );
    }

    onSubmit() {
        this.loginFailed = false;
        this.submitted = true;
        // stop the process here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.login();
    }


    login() {
        // id 기억하기
        if (this.rememberId === true) {
            localStorage.setItem('ID', this.username);
        } else {
            localStorage.removeItem('ID');
        }

        // login
       /* this.authService.login(this.username, this.password).subscribe(() => {
            this.authService.getToken();
        }, err => {
                this.loginFailed = true;
        }); */

        if (this.authService.login(this.username, this.password)) {
            this.router.navigate(['/main']);
        } else {
            this.loginFailed = true;
        }

    }

    logout() {
        this.authService.logout();
    }
}
