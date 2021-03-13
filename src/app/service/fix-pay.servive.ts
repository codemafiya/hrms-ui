import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class AllFixPayService {

  httpUrl;
  

  constructor(private http: HttpClient, private main: MainService) { 
    this.httpUrl = this.main.httpUrl+"/fix";
  }
  //hr
  async  getFixPayMasterData() {
    const resp = await this.http.get<any>(this.httpUrl+'/getfixpay').toPromise().then(res => {
      return res;
    });
    return resp;
  }
  
  async addFixpay(obj){
    const resp = await this.http.post<any>(this.httpUrl+'/addFixPay',obj).toPromise().then(res => {
        return res;
      });
      return resp; 
  }
  

}