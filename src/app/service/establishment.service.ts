import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  httpUrl;

  employee_id;

  constructor(private http: HttpClient, private main: MainService) { 
    this.httpUrl = this.main.httpUrl+"/establishment";
  }
  //hr
  async  getAllEstablishment(obj) {
    const resp = await this.http.get<any>(this.httpUrl+'/getAllEstablishment'+obj).toPromise().then(res => {
      return res;
    });
    return resp;
  }
  async  deleteEstablishment(obj) {
    const resp = await this.http.delete<any>(this.httpUrl+'/deleteEstablishment'+obj).toPromise().then(res => {
      return res;
    });
    return resp;
  }

  async addEstablishment(obj){
    const resp = await this.http.post<any>(this.httpUrl+'/addEstablishment',obj).toPromise().then(res => {
        return res;
      });
      return resp; 
  }
  async updateEstablishment(obj){
    const resp = await this.http.put<any>(this.httpUrl+'/updateEstablishment',obj).toPromise().then(res => {
        return res;
      });
      return resp; 
  }
  

}