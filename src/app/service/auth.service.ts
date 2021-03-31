import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpUrl;

  employee_id;

  constructor(private http: HttpClient, private main: MainService) { 
    this.httpUrl = this.main.httpUrl;
  }
  //hr
  async createAccount(obj){
    const resp = await this.http.post<any>(this.httpUrl+'/signup/createAccount',obj).toPromise().then(res => {
        return res;
      });
      return resp;
  }
  async login(obj){
    const resp = await this.http.post<any>(this.httpUrl+'/signin/login',obj).toPromise().then(res => {
        return res;
      });
      return resp;
  }
  async  getEmployeeMasterData() {
    const resp = await this.http.get<any>(this.httpUrl+'/getAllEmployees').toPromise().then(res => {
      return res;
    });
    return resp;
  }
  async  deleteEmployee(emp_id) {
    const resp = await this.http.delete<any>(this.httpUrl+'/deleteEmployee'+emp_id).toPromise().then(res => {
      return res;
    });
    return resp;
  }

  async updateEmployeeMasterData(obj){
    const resp = await this.http.post<any>(this.httpUrl+'/updateEmployeeInfo',obj).toPromise().then(res => {
        return res;
      });
      return resp; 
  }
  

}