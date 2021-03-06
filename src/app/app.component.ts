import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import {Router, NavigationStart, NavigationEnd} from '@angular/router';
import {Helpers} from "./helpers";
import {MainService} from './service/main.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  constructor(public mainService : MainService,private _router: Router) {}
techErpUser;
  ngOnInit() {
	
	


		this._router.events.subscribe((route) => {
			if (route instanceof NavigationStart) {
				Helpers.setLoading(true);
				Helpers.bodyClass('fixed-navbar');
			}
			if (route instanceof NavigationEnd) {
				window.scrollTo(0, 0);
				Helpers.setLoading(false);

				// Initialize page: handlers ...
				Helpers.initPage();
			}

		});
		this.techErpUser =JSON.parse(localStorage.getItem('techErpUser'));
		console.log(this.techErpUser);
		if(this.techErpUser == null || this.techErpUser == undefined || this.techErpUser == {}){
			this._router.navigate(['/login']);
		}else{
			this.mainService.userInfo = this.techErpUser;
			this.mainService.acct_id = this.techErpUser['acct_id']
		}
  }

  ngAfterViewInit() {}

}
