import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  httpUrl;

  employee_id;

  constructor(private http: HttpClient, private main: MainService) { 
    this.httpUrl = this.main.httpUrl;
  }
  //Pay
  async createPay(obj){
    const resp = await this.http.post<any>(this.httpUrl+'/pay/createPay',obj).toPromise().then(res => {
        return res;
      });
      return resp;
  }
  async updatePay(obj){
    const resp = await this.http.put<any>(this.httpUrl+'/pay/updatePay',obj).toPromise().then(res => {
        return res;
      });
      return resp;
  }
  async getPay(obj){
    const resp = await this.http.get<any>(this.httpUrl+'/pay/getPay'+obj).toPromise().then(res => {
        return res;
      });
      return resp;
  }
  async deletePay(obj){
    const resp = await this.http.delete<any>(this.httpUrl+'/pay/deletePay'+obj).toPromise().then(res => {
        return res;
      });
      return resp;
  }
  //Code Value

  async createCodeValue(obj){
    const resp = await this.http.post<any>(this.httpUrl+'/codeValue/createCodeValue',obj).toPromise().then(res => {
        return res;
      });
      return resp;
  }
  async updateCodeValue(obj){
    const resp = await this.http.put<any>(this.httpUrl+'/codeValue/updateCodeValue',obj).toPromise().then(res => {
        return res;
      });
      return resp;
  }
  async getCodeValue(obj){
    const resp = await this.http.get<any>(this.httpUrl+'/codeValue/getCodeValue'+obj).toPromise().then(res => {
        return res;
      });
      return resp;
  }
  async deleteCodeValue(obj){
    const resp = await this.http.delete<any>(this.httpUrl+'/codeValue/deleteCodeValue'+obj).toPromise().then(res => {
        return res;
      });
      return resp;
  }

}