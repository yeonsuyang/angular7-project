
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfig } from 'src/app/app.config';

@Injectable({ providedIn: 'root' })
export class ApiService {
	//serviceUrl = config.mgmturl ;
	ServiceUrl: String;


	constructor(private http: HttpClient, private oauthService: OAuthService, private config: AppConfig) {
		// this.ServiceUrl = MGMT_URL;
		 this.ServiceUrl = config.getConfig("mgmt_api");
	 }

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+ localStorage.getItem('access_token')
		})
	};

	public getData2(httpurl: string) {
		const url = httpurl;
		// const url = httpurl;
		return this.http.get<any>(url, this.httpOptions);
	}

	public getCsv(httpurl: string) {

		let requestOptions: Object = { 
  		  headers: new HttpHeaders().set('Authorization',  'Bearer '+ localStorage.getItem('access_token')),
   			 responseType: 'text'
		}    
		const url = this.ServiceUrl + httpurl;

	return this.http.get<any>(url, requestOptions);

	}

	public getData(httpurl: string) {
		const url = this.ServiceUrl + httpurl;
		// const url = httpurl;
		return this.http.get<any>(url, this.httpOptions);
	}

	public patchData(httpurl: string, patch: any) {
		const url = this.ServiceUrl + httpurl;

		return this.http.patch<any>(url, patch, this.httpOptions);
	}


	public postData(httpurl: string, body: any) {
		const url = this.ServiceUrl + httpurl;

		return this.http.post<any>(url, body, this.httpOptions);

	}


	public deleteData(httpurl: string) {
		const url = this.ServiceUrl + httpurl;
		
		return this.http.delete<any>(url, this.httpOptions);

	}

}
