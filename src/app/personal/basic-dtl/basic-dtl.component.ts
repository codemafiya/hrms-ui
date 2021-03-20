import { Component, OnInit ,ViewChild} from '@angular/core';
import { AllEmpService} from '../../service/all-emp.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { element } from 'protractor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basic-dtl',
  templateUrl: './basic-dtl.component.html',
  styleUrls: ['./basic-dtl.component.css']
})
export class BasicDtlComponent implements OnInit {

  constructor(private empservice:AllEmpService ) { }
  data=[];
 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  datasource=new MatTableDataSource(this.data);
  displayedColumns: string[] = ['emp_id', 'emp_name', 'emp_primary_phone_no', 'emp_personal_email','emp_gender','dob','joining_date','offer_letter_no','status','action'];
  
  
  async ngOnInit() {
   

    console.log("Hello");
    await this.getEmployeepersonalinfo();
    
  }

  async getEmployeepersonalinfo(){

    var resp = await this.empservice.getEmployeeMasterData();
    console.log(resp);
    if(resp['error']==false){
      this.data = resp.data;
      console.log(this.data);
      this.datasource = new MatTableDataSource(this.data)
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    }else{

    }
  }
  async deleteEmployee(element){
    var resp = await this.empservice.deleteEmployee(element.emp_id);
    console.log(resp);
    if(resp['error']==false){
      Swal.fire("Success","Employee Delete Successfully",'success');
    }else{
      Swal.fire("Oops","Error in deleting employee",'error');

    }
  }
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}
