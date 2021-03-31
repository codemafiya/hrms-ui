import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './main.service';
import { AllEmpService } from './all-emp.service';
@Injectable({
  providedIn: 'root'
})
export class AllBankdtlService {

  httpUrl;
  httpUrl2;
  
  constructor(private http: HttpClient, private main: MainService) { 
    this.httpUrl = this.main.httpUrl+"/bank";
  }
  //hr
  async  getBankdtlMasterData(obj) {
    const resp = await this.http.get<any>(this.httpUrl+'/getallbank'+obj).toPromise().then(res => {
      return res;
    });
    return resp;
  }
  
  async addBankdtl(obj){
    const resp = await this.http.post<any>(this.httpUrl+'/addbank',obj).toPromise().then(res => {
        return res;
      });
      return resp; 
  }
  async udateBankdtl(obj){
    const resp = await this.http.put<any>(this.httpUrl+'/updatebank',obj).toPromise().then(res => {
        return res;
      });
      return resp; 
  }
  
}