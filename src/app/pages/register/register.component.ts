import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import {AuthService} from '../../service/auth.service';
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  constructor(private authService : AuthService) { }
  accountObj={}
  ngOnInit() {
    $('body').addClass('empty-layout bg-silver-300');
  }



  
  async createAccount(){

    console.log(this.accountObj);
    var resp = await this.authService.createAccount(this.accountObj);
    if(resp['error'] == false){
      Swal.fire("Success","Account Created Successfully","success")

    }else{
      Swal.fire("Oops","Error Occurred during creating Account","error")
    }

  }

}
