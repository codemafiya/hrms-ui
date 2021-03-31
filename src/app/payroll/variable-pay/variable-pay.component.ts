import { Component, OnInit,ViewChild } from '@angular/core';
import { VariablePayService } from "../../service/variable-pay.service";
import { AllEmpService} from '../../service/all-emp.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert2';
import {MainService} from '../../service/main.service';

@Component({
  selector: 'app-variable-pay',
  templateUrl: './variable-pay.component.html',
  styleUrls: ['./variable-pay.component.css']
})
export class VariablePayComponent implements OnInit {

  constructor(public mainService: MainService,private varPayService: VariablePayService, private allempservice:AllEmpService) { }
  data = []
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  datasource=new MatTableDataSource(this.data);
  displayedColumns: string[] = ['emp_id', 'emp_name', 'pay_cd', 'pay_type_cd','amount','fin_year','month','status','action'];
  
 
  allEmp=[]
  fixPayObj = {}
  selectedEmpId;
  variablPayObj={}
  async ngOnInit() {
    //await this.getFixpayinfo();
    await this.getEmployeepersonalinfo();

  }
  async getVarpayinfo(){
    var obj = {acct_id : this.mainService.acct_id,emp_id : this.selectedEmpId};

    var resp = await this.varPayService.getAllVarPay(JSON.stringify(obj));
    console.log(resp);
    if(resp['error']==false){
      this.data = resp.data;
      this.datasource = new MatTableDataSource(this.data)
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    }else{

    }
  }
  
  async submitVarPay(){
    this.variablPayObj['acct_id'] = this.mainService.acct_id;
    var resp = await this.varPayService.addVarpay(this.variablPayObj);
    console.log(resp);
    if(resp['error'] == false){
      swal.fire('Success...', 'Variable Pay Saveed Successfully!', 'success')

    }else{
      swal.fire('Oops...', 'Something went wrong!', 'error')

    }
  }
  async deleteVarPay(element){
    var obj = {acct_id : this.mainService.acct_id,id : element.id};

    var resp  = await this.varPayService.deleteVarPay(JSON.stringify(obj));
    if(resp['error'] == false){
      await this.getVarpayinfo()
      swal.fire('Success...', 'Variable Pay Deleted Successfully!', 'success');


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
