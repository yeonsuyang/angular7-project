import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AlertModalService } from '../../service/alertModal.service'

@Component({
  selector: 'app-alertmodal',
  templateUrl: './alertModal.component.html',
  styleUrls: ['./alertModal.component.css']

})
export class AlertModalComponent implements OnInit {

    message: any;  
    constructor(  
        private alertModalService: AlertModalService  
    ) { }  
  
    ngOnInit() {  
        //this function waits for a message from alert service, it gets   
        //triggered when we call this from any other component  
        this.alertModalService.getMessage().subscribe(message => { 
            this.message = message;  
        });  
    }  

}
