import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  httpUrl;

  employee_id;

  constructor(private http: HttpClient, private main: MainService) { 
    this.httpUrl = this.main.httpUrl+"/attendance";
  }
  //hr
  async  getAllAttendance(obj) {
    const resp = await this.http.get<any>(this.httpUrl+'/getAllAttendance'+obj).toPromise().then(res => {
      return res;
    });
    return resp;
  }
  async  deleteAttendance(obj) {
    const resp = await this.http.delete<any>(this.httpUrl+'/deleteAttendance'+obj).toPromise().then(res => {
      return res;
    });
    return resp;
  }

  async addAttendance(obj){
    const resp = await this.http.post<any>(this.httpUrl+'/addAttendance',obj).toPromise().then(res => {
        return res;
      });
      return resp; 
  }
  async updateAttendance(obj){
    const resp = await this.http.put<any>(this.httpUrl+'/updateAttendance',obj).toPromise().then(res => {
        return res;
      });
      return resp; 
  }
  

}