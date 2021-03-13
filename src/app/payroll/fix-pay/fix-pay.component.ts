import { Component, OnInit } from '@angular/core';
import { AllFixPayService } from "../../service/fix-pay.servive";
import { AllEmpService} from '../../service/all-emp.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-fix-pay',
  templateUrl: './fix-pay.component.html',
  styleUrls: ['./fix-pay.component.css']
})
export class FixPayComponent implements OnInit {

  constructor(private fixpayservice: AllFixPayService, private allempservice:AllEmpService) { }
  data = []
  empdata=[]
  addfixpayObj = {}
  async ngOnInit() {
    await this.getFixpayinfo();
    await this.getEmployeepersonalinfo();

  }
  async getFixpayinfo(){

    var resp = await this.fixpayservice.getFixPayMasterData();
    console.log(resp);
    if(resp['error']==false){
      this.data = resp.data;
    }else{

    }
  }
  
  async submit(){
    console.log(this.addfixpayObj);
    var resp = await this.fixpayservice.addFixpay(this.addfixpayObj);
    console.log(resp);
    if(resp['error'] == false){
      await this.getEmployeepersonalinfo();
      swal.fire('Success...', 'Fix Pay Save Successfully!', 'success')

    }else{
      swal.fire('Oops...', 'Something went wrong!', 'error')

    }
  }

  async getEmployeepersonalinfo(){

    var resp = await this.allempservice.getEmployeeMasterData();
    console.log(resp);
    if(resp['error']==false){
      this.empdata = resp.data;
    }else{

    }
  } 

}
