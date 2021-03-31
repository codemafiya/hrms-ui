import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
declare var $:any;
import {MainService} from '../../service/main.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(public mainService: MainService,private authService : AuthService,private router : Router) { }
  loginObj={};
  ngOnInit() {
    $('body').addClass('empty-layout bg-silver-300');
  }
  async login(){
    console.log(this.loginObj);
    var resp = await this.authService.login(this.loginObj);
    if(resp['error'] == false){
      var userData = resp['data'][0];
      localStorage.setItem("techErpUser",JSON.stringify(userData));
      this.mainService.userInfo = userData;
			this.mainService.acct_id = userData['acct_id']
      this.router.navigate(['/index']);
      Swal.fire("Success","Login Successfull","success");

    }else{
      Swal.fire("Oops","Some Error Occurred","error");
    }
  }


  ngOnDestroy() {
    $('body').removeClass('empty-layout bg-silver-300');
  }

}
