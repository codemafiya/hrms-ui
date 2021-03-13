import { Component, OnInit } from '@angular/core';
import { AllBankdtlService } from "../../service/bank.service";
import { AllEmpService} from '../../service/all-emp.service';
import swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-bank-dtl',
  templateUrl: './bank-dtl.component.html',
  styleUrls: ['./bank-dtl.component.css']
})
export class BankDtlComponent implements OnInit {

  constructor(private bankservice:AllBankdtlService, private allempservice:AllEmpService ) { }
  data=[]
  empdata=[]
  addbankObj={}
  async ngOnInit() {
    await this.getBankDetailsinfo();
    await this.getEmployeepersonalinfo();
    
  }

  async getBankDetailsinfo(){

    var resp = await this.bankservice.getBankdtlMasterData();
    console.log(resp);
    if(resp['error']==false){
      this.data = resp.data;
    }else{

    }
  }

  async submit(){
    console.log(this.addbankObj);
    var resp = await this.bankservice.addBankdtl(this.addbankObj);
    console.log(resp);
    if(resp['error'] == false){
      await this.getBankDetailsinfo();
      swal.fire('Success...', 'Bank Details Save Successfully!', 'success')

    }else{
      swal.fire('Oops...', 'Something went wrong!', 'error')

    }
  }
  empObj={};
  updateBankObj={}
  openUpdate(element){
    this.updateBankObj = Object.assign({},element);
    $('.nav-tabs a[href="#tab-7-3"]').tab('show')
  }
  async getEmployeepersonalinfo(){

    var resp = await this.allempservice.getEmployeeMasterData();
    console.log(resp);
    if(resp['error']==false){
      this.empdata = resp.data;
      for(var i=0;i<this.empdata.length;i++){
        this.empObj[this.empdata[i]['emp_id']] = this.empdata[i]['emp_first_name']
      }
    }else{

    }
  } 
  

}
