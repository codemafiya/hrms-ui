import { Component, OnInit ,ViewChild} from '@angular/core';
import { AllEmpService} from '../../service/all-emp.service';
import { PostingService} from '../../service/posting.service';
import {MainService} from '../../service/main.service';

import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.css']
})
export class PostingComponent implements OnInit {

  constructor(public mainService: MainService,private empservice:AllEmpService,private postingService : PostingService ) { }
  data=[];
 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  datasource=new MatTableDataSource(this.data);
  displayedColumns: string[] = ['emp_id', 'emp_name', 'from_date', 'to_date','department_cd','project_cd','work','role_cd','action'];
  postObj={}
  
  async ngOnInit() {
   

   
    await this.getEmployeepersonalinfo();
    await this.getAllPosting();
    
  }
  allEmp = []
  async getEmployeepersonalinfo(){
    var obj = {acct_id : this.mainService.acct_id};

    var resp = await this.empservice.getEmployeeMasterData(JSON.stringify(obj));
    console.log(resp);
    if(resp['error']==false){
      this.allEmp = resp.data;
      for(var i=0;i<this.allEmp.length;i++){
        this.allEmp[i]['name'] = this.allEmp[i]['emp_first_name']+" "+this.allEmp[i]['emp_last_name']
      }
     
    }else{

    }
  }
  async getAllPosting(){
    var obj = {acct_id : this.mainService.acct_id};

    var resp = await this.postingService.getAllPosting(JSON.stringify(obj));
    console.log(resp);
    if(resp['error']==false){
      this.data = resp.data;
      
      this.datasource = new MatTableDataSource(this.data)
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    }else{

    }
  }
  async addPosting(){
    console.log(this.postObj);
    this.postObj['acct_id'] = this.mainService.acct_id;
    var resp = await this.postingService.addPosting(this.postObj);
    if(resp['error'] == false){
      await this.getAllPosting();
      Swal.fire("Success","Posting Details Added","success");

    }else{
      Swal.fire("Oops","Error while adding posting details","error");
    }
  }
  async deletePosting(element){
    var obj = {acct_id : this.mainService.acct_id,id : element.id};

    var resp = await this.postingService.deletePosting(JSON.stringify(obj));
    if(resp['error'] == false){
      await this.getAllPosting();
      Swal.fire("Success","Posting Details Deleted","success");

    }else{
      Swal.fire("Oops","Error while deleting posting details","error");
    } 
  }
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}
