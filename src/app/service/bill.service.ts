import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './main.service';
import { AllEmpService } from './all-emp.service';
@Injectable({
  providedIn: 'root'
})
export class BillService {

  httpUrl;
  httpUrl2;
  
  constructor(private http: HttpClient, private main: MainService) { 
    this.httpUrl = this.main.httpUrl+"/bill";
  }
  async getAllBill(obj){
      const resp = await  this.http.get<any>(this.httpUrl+'/getAllBill'+obj).toPromise().then(res=>{
          return res;

      })
      return resp;
  }
  async getMonthlyBill(obj){
    const resp = await  this.http.get<any>(this.httpUrl+'/getMonthlyBill'+obj).toPromise().then(res=>{
        return res;

    })
    return resp;
}
  async getBillItems(obj){
    const resp = await  this.http.get<any>(this.httpUrl+'/getBillItems'+obj).toPromise().then(res=>{
        return res;

    })
    return resp;
}
  async createBill(obj){
    const resp = await  this.http.post<any>(this.httpUrl+'/createBill',obj).toPromise().then(res=>{
        return res;

    })
    return resp;
  }
  async updateBill(obj){
    const resp = await  this.http.put<any>(this.httpUrl+'/updateBill',obj).toPromise().then(res=>{
        return res;

    })
    return resp;
  }
  async deleteBill(obj){
    const resp = await  this.http.delete<any>(this.httpUrl+'/deleteBill'+obj).toPromise().then(res=>{
        return res;

    })
    return resp;
  }
  async getAllFixPay(obj){
    const resp = await  this.http.get<any>(this.httpUrl+'/getAllFixPay'+obj).toPromise().then(res=>{
        return res;

    })
    return resp;
  }
}