import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../_services/script-loader.service';
import {AuthService} from '../../service/auth.service';
import {MainService} from '../../service/main.service'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, AfterViewInit {

  constructor(public mainService : MainService,private authService : AuthService,private _script: ScriptLoaderService) { }
  profileInfo={};
  updateObj={};
  passwordObj={};
  ngOnInit() {
    this.profileInfo = JSON.parse(localStorage.getItem('techErpUser'));
    this.updateObj = JSON.parse(localStorage.getItem('techErpUser'));
    if(this.updateObj['first_name'] == null || this.updateObj['first_name'] == undefined ){
      this.updateObj['first_name'] = "";
    }
    if(this.updateObj['last_name'] == null || this.updateObj['last_name'] == undefined ){
      this.updateObj['last_name'] = "";
    }
    if(this.updateObj['email'] == null || this.updateObj['email'] == undefined ){
      this.updateObj['email'] = "";
    }
    if(this.updateObj['phone_no'] == null || this.updateObj['phone_no'] == undefined ){
      this.updateObj['phone_no'] = "";
    }
    
  }

  ngAfterViewInit() {
    this._script.load('./assets/js/scripts/profile-demo.js');
  }
  async updateInfo(){
    
    var resp = await this.authService.updateProfile(this.updateObj);
    if(resp['error'] == false){
      this.mainService.userInfo = this.updateObj;
      localStorage.setItem('techErpUser',JSON.stringify(this.updateObj));
      this.profileInfo = Object.assign({},this.updateObj);
      Swal.fire("Success","Profile Updated Successfully","success");
    }else{
      Swal.fire("Oops","Profile Update Failed","error");

    }
  }
  async updatePassword(){
    if(this.passwordObj['old_password'] != this.profileInfo['password']){
      Swal.fire("Error","Old Password Does'nt Match","error");
      return;
    }
    if(this.passwordObj['password'] != this.passwordObj['confirm_password']){
      Swal.fire("Error","Password Does'nt Match","error");
      return;
    }
    this.passwordObj['id'] = this.profileInfo['id'];
    var resp = await this.authService.updatePassword(this.passwordObj);
    if(resp['error'] == false){
      this.profileInfo['password'] = this.passwordObj['password'];
      localStorage.setItem('techErpUser',JSON.stringify(this.profileInfo));
      this.mainService.userInfo['password'] = this.profileInfo['password'];

      Swal.fire("Success","Password Update Successfully","success");
    }else{
      Swal.fire("Oops","Password Update Failed","error");

    }
  }

}
