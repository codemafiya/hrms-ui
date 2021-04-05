import { Component, OnInit, ViewChild } from '@angular/core';
import { AttendanceService } from "../../service/attendance.service";
import { AllEmpService} from '../../service/all-emp.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert2';
import {MainService} from '../../service/main.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(public mainService : MainService,private attendanceService:AttendanceService, private allempservice:AllEmpService ) { }
  data=[]
  
 
  ques=[{code:'N',value:'NO'},{code:'Y',value:'YES'}]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  datasource=new MatTableDataSource(this.data);
  displayedColumns: string[] = ['emp_id', 'emp_name', 'dt', 'arr_time','dep_time','is_short_leave','emp_reason','mgr_comm','salary_ded','action'];
  
  addAttendanceObj={}
  updateAttendanceObj={}
  attendance={}
  async ngOnInit() {
    await this.getEmployeepersonalinfo()
    //await this.getBankDetailsinfo();
    // await this.getEmployeepersonalinfo();
    
  }

  async getAllAttendance(){
    this.attendance['acct_id']= this.mainService.acct_id;

    var resp = await this.attendanceService.getAllAttendance(JSON.stringify(this.attendance));
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
    this.addAttendanceObj['acct_id']=this.mainService.acct_id;
    var resp = await this.attendanceService.addAttendance(this.addAttendanceObj);
    if(resp['error'] == false){
      await this.getAllAttendance();
      swal.fire('Success...', 'Attendance Added Successfully!', 'success')

    }else{
      swal.fire('Oops...', 'Something went wrong!', 'error')

    }
  }
  openUpdate(element){
    this.updateAttendanceObj = Object.assign({},element);
    this.updateAttendanceObj['dt'] = this.updateAttendanceObj['dt'].split('T')[0]
    $('.nav-tabs a[href="#tab-7-3"]').tab('show')
  }
  allEmp=[]
  async getEmployeepersonalinfo(){
    var obj = {acct_id : this.mainService.acct_id};

    var resp = await this.allempservice.getEmployeeMasterData(JSON.stringify(obj));
    if(resp['error']==false){
      this.allEmp = resp.data;
      for(var i=0;i<this.allEmp.length;i++){
        this.allEmp[i]['name'] = this.allEmp[i]['emp_id']+" - "+this.allEmp[i]['emp_first_name']+" "+this.allEmp[i]['emp_last_name']
      }
    }else{

    }
  } 
  async update(){
    this.updateAttendanceObj['acct_id'] = this.mainService.acct_id;
    var resp = await this.attendanceService.updateAttendance(this.updateAttendanceObj);
    if(resp['error'] == false){
      await this.getAllAttendance();
      swal.fire("Success","Updated Successfully","success")
    }else{
      swal.fire("Oops","Error while Updating Record","error")

    } 
  }
  async deleteAttendance(element){
    var obj = {id: element['id'],acct_id: this.mainService.acct_id};
    var resp = await this.attendanceService.deleteAttendance(JSON.stringify(obj));
    if(resp['error']==false){
     await this.getAllAttendance();
     swal.fire("Success","Deleted Successfully","success")

    }else{
      swal.fire("Oops","Error while Deleting Record","error")
    }
  }

}
