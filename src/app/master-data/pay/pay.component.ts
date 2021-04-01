import { Component, OnInit,ViewChild } from '@angular/core';
import { MasterDataService } from "../../service/master-data.service";
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert2';
import {MainService} from '../../service/main.service';
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  constructor(public mainService: MainService,private masterDataService: MasterDataService) { }
  data = []
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  datasource=new MatTableDataSource(this.data);
  displayedColumns: string[] = ['id', 'pay_cd', 'pay_type_cd', 'status','action'];
  
 
  allPay=[]
  payObj = {}
  async ngOnInit() {
    await this.getAllPay();
    

  }
  async getAllPay(){
    var obj = {acct_id : this.mainService.acct_id};

    var resp = await this.masterDataService.getPay(JSON.stringify(obj));
    if(resp['error']==false){
      this.data = resp.data;
      this.datasource = new MatTableDataSource(this.data)
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    }else{

    }
  }
  
  async submitPay(){
    this.payObj['acct_id'] = this.mainService.acct_id;
    var resp = await this.masterDataService.createPay(this.payObj);
    if(resp['error'] == false){
      await this.getAllPay()
      swal.fire('Success...', 'Pay Added Successfully!', 'success')

    }else{
      swal.fire('Oops...', 'Something went wrong!', 'error')

    }
  }
  async deletePay(element){
    var obj = {acct_id : this.mainService.acct_id,id : element.id};

    var resp  = await this.masterDataService.deletePay(JSON.stringify(obj));
    if(resp['error'] == false){
      await this.getAllPay()
      swal.fire('Success...', 'Pay Deleted Successfully!', 'success');


    }else{
      swal.fire('Oops...', 'Something went wrong!', 'error')

    }
  }
 
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}
