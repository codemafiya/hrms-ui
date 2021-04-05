import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  httpUrl;

  employee_id;

  constructor(private http: HttpClient, private main: MainService) { 
    this.httpUrl = this.main.httpUrl+"/leaveInfo";
  }
  //hr
  async  getLeaveInfo(obj) {
    const resp = await this.http.get<any>(this.httpUrl+'/getLeaveInfo'+obj).toPromise().then(res => {
      return res;
    });
    return resp;
  }
  async  deleteLeaveInfo(obj) {
    const resp = await this.http.delete<any>(this.httpUrl+'/deleteLeaveInfo'+obj).toPromise().then(res => {
      return res;
    });
    return resp;
  }

  async addLeaveInfo(obj){
    const resp = await this.http.post<any>(this.httpUrl+'/addLeaveInfo',obj).toPromise().then(res => {
        return res;
      });
      return resp; 
  }
  async updateLeaveInfo(obj){
    const resp = await this.http.put<any>(this.httpUrl+'/updateLeaveInfo',obj).toPromise().then(res => {
        return res;
      });
      return resp; 
  }
  

}