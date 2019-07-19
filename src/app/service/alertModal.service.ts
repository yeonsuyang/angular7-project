
import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { AlertModalComponent } from '../partial/alertModal/alertModal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationStart } from '@angular/router';  
import { Observable } from 'rxjs';  


@Injectable()
export class AlertModalService {
	
	private subject = new Subject<any>();  
	
    constructor() { }  
    confirmThis(type: string, data: any, siFn: () => void, noFn: () => void) {  
        this.setConfirmation(type,data, siFn, noFn);  
	}  
	
	// data = {reason:,status}
    setConfirmation(type: string, data: any, siFn: () => void, noFn: () => void) {  
		let that = this; 
        this.subject.next({  
            type: type,  
			text: data,  
            siFn:  
                function () {   
					that.subject.next(); //this will close the modal'
					siFn();  

                },  
            noFn: function () {  
				that.subject.next();  
                noFn();  
            }  
        });  
  
    }  
  
	// 대화 상자에 표시 할 메시지를 가져옵니다.
    getMessage(): Observable<any> {  
        return this.subject.asObservable();  
	}  
	


	
  
	

}
