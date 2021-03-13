import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class JoiningService {

  httpUrl;

  employee_id;

  constructor(private http: HttpClient, private main: MainService) { 
    this.httpUrl = this.main.httpUrl+"/personal";
  }
  async addJoining(obj){
    const resp = await this.http.post<any>(this.httpUrl+'/addJoining',obj).toPromise().then(res => {
        return res;
      });
      return resp; 
  }
}