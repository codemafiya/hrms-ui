import { Component, OnInit, ViewChild } from '@angular/core';
import { AllBankdtlService } from "../../service/bank.service";
import { AllEmpService} from '../../service/all-emp.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert2';
import {MainService} from '../../service/main.service';

declare var $: any;
@Component({
  selector: 'app-bank-dtl',
  templateUrl: './bank-dtl.component.html',
  styleUrls: ['./bank-dtl.component.css']
})
export class BankDtlComponent implements OnInit {

  constructor(public mainService : MainService,private bankservice:AllBankdtlService, private allempservice:AllEmpService ) { }
  data=[]
  
 
 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  datasource=new MatTableDataSource(this.data);
  displayedColumns: string[] = ['emp_id', 'emp_name', 'emp_primary_phone_no', 'bank_cd','ifsc_cd','bank_account_no','pf_account_no','pan_no','action'];
  
  addbankObj={}
  async ngOnInit() {
    await this.getBankDetailsinfo();
    // await this.getEmployeepersonalinfo();
    
  }

  async getBankDetailsinfo(){
    var obj = {acct_id : this.mainService.acct_id};

    var resp = await this.bankservice.getBankdtlMasterData(JSON.stringify(obj));
    console.log(resp);
    if(resp['error']==false){
      this.data = resp.data;
      this.datasource = new MatTableDataSource(this.data)
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    }else{

    }
  }

  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
  async submit(){
    console.log(this.addbankObj);
    this.addbankObj['acct_id']=this.mainService.acct_id;
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
 
  

}
