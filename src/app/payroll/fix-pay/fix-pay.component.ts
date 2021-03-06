import { Component, OnInit,ViewChild } from '@angular/core';
import { AllFixPayService } from "../../service/fix-pay.servive";
import { AllEmpService} from '../../service/all-emp.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert2';
import {MainService} from '../../service/main.service';

@Component({
  selector: 'app-fix-pay',
  templateUrl: './fix-pay.component.html',
  styleUrls: ['./fix-pay.component.css']
})
export class FixPayComponent implements OnInit {

  constructor(public mainService: MainService,private fixpayservice: AllFixPayService, private allempservice:AllEmpService) { }
  data = []
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  datasource=new MatTableDataSource(this.data);
  displayedColumns: string[] = ['emp_id', 'emp_name', 'pay_cd', 'pay_type_cd','amount','effective_start_dt','status','effective_end_dt','action'];
  
 
  allEmp=[]
  fixPayObj = {}
  selectedEmpId;
  async ngOnInit() {
    //await this.getFixpayinfo();
    await this.getEmployeepersonalinfo();

  }
  async getFixpayinfo(){
    var obj = {acct_id : this.mainService.acct_id,emp_id : this.selectedEmpId};

    var resp = await this.fixpayservice.getAllFixPay(JSON.stringify(obj));
    console.log(resp);
    if(resp['error']==false){
      this.data = resp.data;
      this.datasource = new MatTableDataSource(this.data)
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    }else{

    }
  }
  
  async submitFixPay(){
    console.log(this.fixPayObj);
    this.fixPayObj['acct_id'] = this.mainService.acct_id;
    var resp = await this.fixpayservice.addFixpay(this.fixPayObj);
    console.log(resp);
    if(resp['error'] == false){
      swal.fire('Success...', 'Fix Pay Saveed Successfully!', 'success')

    }else{
      swal.fire('Oops...', 'Something went wrong!', 'error')

    }
  }
  async deleteFixPay(element){
    var obj = {acct_id : this.mainService.acct_id,id : element.id};

    var resp  = await this.fixpayservice.deleteFixPay(JSON.stringify(obj));
    if(resp['error'] == false){
      await this.getFixpayinfo()
      swal.fire('Success...', 'Fix Pay Deleted Successfully!', 'success');


    }else{
      swal.fire('Oops...', 'Something went wrong!', 'error')

    }
  }
  async getEmployeepersonalinfo(){
    var obj = {acct_id : this.mainService.acct_id};

    var resp = await this.allempservice.getEmployeeMasterData(JSON.stringify(obj));
    console.log(resp);
    if(resp['error']==false){
      this.allEmp = resp.data;
      for(var i=0;i<this.allEmp.length;i++){
        this.allEmp[i]['name'] = this.allEmp[i]['emp_id']+" - "+this.allEmp[i]['emp_first_name']+" "+this.allEmp[i]['emp_last_name']
      }
    }else{

    }
  } 
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}
