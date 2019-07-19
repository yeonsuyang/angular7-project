import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, ObservableInput } from 'rxjs';
import { authConfig } from './service/auth/auth-config';


@Injectable({ providedIn: 'root'})
export class AppConfig {

   private config: Object = null;

   constructor(private httpHandler: HttpBackend) {
   }


 /**
  * Use to get the data found in the second file (config file)
  */
   public getConfig(key: any) {
       return this.config[key];
   }

 /**
  * This method:
  *    Loads “config.json” to get all env’s variables
  *    we can replace this file before running docker
  *    /usr/share/nginx/html/assets/config/config.json
  */
   public getConfigs(): Promise<boolean> {
       const http = new HttpClient(this.httpHandler);

       return new Promise<boolean>((resolve: (a: boolean) => void): void => {
           http.get('/assets/config/config.json')
           .pipe(
           map((x: Object) => {
			   this.config = x;
			   authConfig.loginUrl = this.getConfig("api_uri")+ 'oauth/authorize';
               resolve(true);
           }),
           catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
               if (x.status !== 404) {
               resolve(false);
               }

               resolve(true);
               return of({});
           })
           ).subscribe();
       });
   }
}