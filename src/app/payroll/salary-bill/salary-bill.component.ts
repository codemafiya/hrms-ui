import { Component, OnInit,ViewChild } from '@angular/core';
import { AllFixPayService } from "../../service/fix-pay.servive";
import { AllEmpService} from '../../service/all-emp.service';
import { BillService} from '../../service/bill.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert2';
import {MainService} from '../../service/main.service';

@Component({
  selector: 'app-salary-bill',
  templateUrl: './salary-bill.component.html',
  styleUrls: ['./salary-bill.component.css']
})
export class SalaryBillComponent implements OnInit {

  constructor(public mainService : MainService,private billService : BillService,private fixpayservice: AllFixPayService, private allempservice:AllEmpService) { }
  data = []
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  datasource=new MatTableDataSource(this.data);
  displayedColumns: string[] = ['id', 'bill_desc', 'bill_dt', 'bill_amt','bill_status','year','month','action'];
  months = [{code:1,value: "January"},{code:2,value: "February"},{code:3,value: "March"},{code:4,value: "April"},{code:5,value: "May"},{code:6,value: "June"},{code:7,value: "July"},{code:8,value: "August"},{code:9,value: "September"},{code:10,value: "October"},{code:11,value: "November"},{code:12,value: "December"}]
  category = [{code: 'ALL',value: 'ALL'},{code:'IND',value:'Individual'}]
  allEmp=[]
  fixPayObj = {}
  selectedEmpId;
  async ngOnInit() {
    //await this.getFixpayinfo();
    await this.getEmployeepersonalinfo();
    await this.getAllBill();


  }
  async getAllBill(){
    var obj = {acct_id : this.mainService.acct_id};

    var resp = await this.billService.getAllBill(JSON.stringify(obj));
    console.log(resp);
    if(resp['error']==false){
      this.data = resp.data;
      this.datasource = new MatTableDataSource(this.data)
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    }else{

    }
  }
  allFixPay=[]
  async getFixpayinfo(){
    var obj = {acct_id : this.mainService.acct_id};

    var resp = await this.billService.getAllFixPay(JSON.stringify(obj));
    console.log(resp);
    if(resp['error']==false){
      this.allFixPay = resp.data;
      // this.datasource = new MatTableDataSource(this.data)
      // this.datasource.paginator = this.paginator;
      // this.datasource.sort = this.sort;
    }else{

    }
  }
  billObj={}
  async createBill(){
    await this.getFixpayinfo();
    console.log(this.billObj);
    this.billObj['bill_amt'] = 0;
    
    this.billObj['bill_type'] = "S";
    this.billObj['bill_status'] = "G";
    this.billObj['data'] = [];
    this.billObj['acct_id'] = this.mainService.acct_id;
    var fx = [];
    if(this.billObj['cat']=='IND'){
      for(var i=0;i<this.allFixPay.length;i++){
        for(var j=0;j<this.billObj['emp_id'].length;j++){
          if(this.allFixPay[i]['emp_id'] == this.billObj['emp_id'][j]){
            fx.push(this.allFixPay[i]);
          }
        }
      }
    }else{
      fx = this.allFixPay;
    }
    for(var i=0;i<fx.length;i++){
      this.billObj['data'].push({emp_id:fx[i]['emp_id'],pay_cd:fx[i]['pay_cd'],'pay_type_cd':fx[i]['pay_type_cd'],amount: fx[i]['amount'], days: 30})
      this.billObj['bill_amt']+= fx[i]['amount'];
    }
    console.log(this.billObj['data']);
    var resp = await this.billService.createBill(this.billObj);
    console.log(resp);
    if(resp['error'] == false){
      await this.getAllBill()
      swal.fire('Success...', 'Bill Created Successfully!', 'success')

    }else{
      swal.fire('Oops...', 'Something went wrong!', 'error')


    }
  }
  async deleteBill(element){
    var obj = {acct_id : this.mainService.acct_id,id : element.id};

    var resp  = await this.billService.deleteBill(JSON.stringify(obj));
    if(resp['error'] == false){
      await this.getAllBill()
      swal.fire('Success...', 'Bill Deleted Successfully!', 'success');


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
