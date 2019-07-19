import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private authService: AuthService) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

		// session storage token || local storage token 있으면 ok
		/* if (this.authService.checkSessionToken() || this.authService.checkLocalToken()) {
		
			if (this.authService.checkSessionToken() &&  // session은 있으면서
			(!this.authService.checkLocalToken() || this.authService.getTokenExpired())) {
				// 토큰이 만료되었거나 없다면.
				localStorage.setItem('userInfo', this.authService.getDecodeSessionToken());
				localStorage.setItem('access_token', this.authService.getAccessToken());
				this.authService.setloggedIn();
				return true; // session 이 유효하기때문에 true
			} else { // local의 session이 정확하다면
				this.authService.setloggedIn();
				return true;
			}
		} */
        console.log(1);
        if(localStorage.getItem('user') !== null && localStorage.getItem('user') !== ''){
            return true;
        }

         console.log(3);
		// 다 아니면 로그인 페이지로
		//this.authService.setloggedOut();
		this.router.navigate(['/login']);
		//  location.reload();
		return false;
	}
}
