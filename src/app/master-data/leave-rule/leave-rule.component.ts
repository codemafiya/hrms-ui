import { Component, OnInit,ViewChild } from '@angular/core';
import { MasterDataService } from "../../service/master-data.service";
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert2';
import {MainService} from '../../service/main.service';
@Component({
  selector: 'app-leave-rule',
  templateUrl: './leave-rule.component.html',
  styleUrls: ['./leave-rule.component.css']
})
export class LeaveRuleComponent implements OnInit {

  constructor(public mainService: MainService,private masterDataService: MasterDataService) { }
  data = []
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  datasource=new MatTableDataSource(this.data);
  displayedColumns: string[] = ['id','leave_cd', 'leave_name', 'leave_period','no_of_leaves', 'status','action'];
  
 
  allLeaveRules=[]
  leaveRuleObj = {}
  async ngOnInit() {
    await this.getLeaveRules();
    

  }

  async getLeaveRules(){
    var obj = {acct_id : this.mainService.acct_id};

    var resp = await this.masterDataService.getLeaveRule(JSON.stringify(obj));
    if(resp['error']==false){
      this.data = resp.data;
      this.datasource = new MatTableDataSource(this.data)
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    }else{

    }
  }
  
  async submitLeaveRule(){
    this.leaveRuleObj['acct_id'] = this.mainService.acct_id;
    var resp = await this.masterDataService.createLeaveRule(this.leaveRuleObj);
    if(resp['error'] == false){
      await this.getLeaveRules()
      swal.fire('Success...', 'Leave Rule Added Successfully!', 'success')

    }else{
      swal.fire('Oops...', 'Something went wrong!', 'error')

    }
  }
  async deleteLeaveRule(element){
    var obj = {acct_id : this.mainService.acct_id,id : element.id};

    var resp  = await this.masterDataService.deleteLeaveRule(JSON.stringify(obj));
    if(resp['error'] == false){
      await this.getLeaveRules()
      swal.fire('Success...', 'Leave Rule Deleted Successfully!', 'success');


    }else{
      swal.fire('Oops...', 'Something went wrong!', 'error')

    }
  }
 
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}
