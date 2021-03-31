import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class PostingService {

  httpUrl;

  employee_id;

  constructor(private http: HttpClient, private main: MainService) { 
    this.httpUrl = this.main.httpUrl+"/post";
  }
  //hr
  async  getAllPosting(obj) {
    const resp = await this.http.get<any>(this.httpUrl+'/getAllPosting'+obj).toPromise().then(res => {
      return res;
    });
    return resp;
  }
  async  deletePosting(id) {
    const resp = await this.http.delete<any>(this.httpUrl+'/deletePosting'+id).toPromise().then(res => {
      return res;
    });
    return resp;
  }

  async updatePosting(obj){
    const resp = await this.http.post<any>(this.httpUrl+'/updatePosting',obj).toPromise().then(res => {
        return res;
      });
      return resp; 
  }
  async addPosting(obj){
    var resp = this.http.post<any>(this.httpUrl+"/addPost",obj).toPromise().then(res=>{
      return res;
    });
    return resp;
  }
  // async deletePosting(emp_id){
  //   var resp = await this.http.delete<any>(this.http+"/deletePosting"+id).toPromise().then(res=>{
  //     return res;
  //   })
  //   return resp;
  // }
  
}
