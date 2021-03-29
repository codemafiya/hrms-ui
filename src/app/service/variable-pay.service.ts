import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class VariablePayService {

  httpUrl;
  

  constructor(private http: HttpClient, private main: MainService) { 
    this.httpUrl = this.main.httpUrl+"/variablePay";
  }
  async  getAllVarPay(selectedEmpId) {
    const resp = await this.http.get<any>(this.httpUrl+'/getVariablePay'+selectedEmpId).toPromise().then(res => {
      return res;
    });
    return resp;
  }
  
  async addVarpay(obj){
    const resp = await this.http.post<any>(this.httpUrl+'/addVariablePay',obj).toPromise().then(res => {
        return res;
      });
      return resp; 
  }
  async deleteVarPay(id){
    var resp = await this.http.delete<any>(this.httpUrl+'/deleteVariablePay'+id).toPromise().then(res=>{
      return res;
    })
    return resp;
  }
}