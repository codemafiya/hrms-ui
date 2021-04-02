import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {
	
	httpUrl = "http://localhost:3001";
  //httpUrl = "http://206.189.137.110:3001";
  acct_id=-1;
  userInfo={}

}