import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NGXLogger } from 'ngx-logger';
import { PagerService } from '../service/page.service';
import { ApiService } from '../service/api.service';
import { AlertModalService } from '../service/alertModal.service';
import { PageInfo } from '../service/models/pageInfo';
import { User } from '../service/models/user';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

    id: string;
    today: string;
    testFlag = false;
    userLists: User[];
    user = new User();

    // paged items
    pageInfo = new PageInfo();
    pager: any = {};
    pagedItems: any = [];

    @ViewChild('detailModal', { static: true }) detailModal: { show: () => void; };
    @ViewChild('testModal', { static: true }) testModal: { show: () => void; };

    constructor(public datepipe: DatePipe, private apiService: ApiService, private alertModalService: AlertModalService,
                private logger: NGXLogger, private pagerService: PagerService) {
        this.id = localStorage.getItem('user');
    }

    ngOnInit() {
        const date = new Date();
        this.today = this.datepipe.transform(date, 'yyyy-MM-dd HH:mm:ss');

        const url = '../../assets/users.json';

        this.apiService.getData2(url).subscribe(data => {
            console.log(data);
            this.userLists = data.users;
            this.pageInfo = data._pagination;
            this.setPage(0);
        });

    }

    popup(user) {
        this.user = user;
        this.detailModal.show();
    }

    popup2() {
        this.testModal.show();
    }

    errorPopup() {
        const data = {
            reason: '에러 팝업테스트',
            status: ''
        };

        const that = this;
        this.alertModalService.confirmThis('error', data, function() {
            that.testFlag = true; }, function() { });
    }

    setPage(page: number) {
        // get current page of items
        this.pager = this.pagerService.getPager(this.pageInfo.totalElements, 5, this.pageInfo.totalPages, page);
        this.logger.info(JSON.stringify(this.pager));
        this.pagedItems = this.userLists.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
