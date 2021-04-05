import { Component, OnInit, ViewChild } from '@angular/core';
import { EstablishmentService } from "../../service/establishment.service";
import { AllEmpService} from '../../service/all-emp.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert2';
import {MainService} from '../../service/main.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.css']
})
export class EstablishmentComponent implements OnInit {

  constructor(public mainService : MainService,private establishmentService : EstablishmentService, private allempservice:AllEmpService ) { }
  data=[]
  
 
  ques=[{code:'N',value:'NO'},{code:'Y',value:'YES'}]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  datasource=new MatTableDataSource(this.data);
  displayedColumns: string[] = ['emp_id', 'emp_name', 'emp_designation', 'department','office','action'];
  
  addEstablishmentObj={}
  updateEstablishmentObj={}
  establishment={}
  async ngOnInit() {
    await this.getEmployeepersonalinfo();
    //await this.getBankDetailsinfo();
     await this.getAllEstablishment();
    
  }

  async getAllEstablishment(){
    this.establishment['acct_id']= this.mainService.acct_id;

    var resp = await this.establishmentService.getAllEstablishment(JSON.stringify(this.establishment));
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
    this.addEstablishmentObj['acct_id']=this.mainService.acct_id;
    var resp = await this.establishmentService.addEstablishment(this.addEstablishmentObj);
    if(resp['error'] == false){
      await this.getAllEstablishment();
      swal.fire('Success...', 'Establishment Added Successfully!', 'success')

    }else{
      swal.fire('Oops...', 'Something went wrong!', 'error')

    }
  }
  openUpdate(element){
    this.updateEstablishmentObj = Object.assign({},element);
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
    this.updateEstablishmentObj['acct_id'] = this.mainService.acct_id;
    var resp = await this.establishmentService.updateEstablishment(this.updateEstablishmentObj);
    if(resp['error'] == false){
      await this.getAllEstablishment();
      swal.fire("Success","Updated Successfully","success")
    }else{
      swal.fire("Oops","Error while Updating Record","error")

    } 
  }
  async deleteEstablishment(element){
    var obj = {id: element['id'],acct_id: this.mainService.acct_id};
    var resp = await this.establishmentService.deleteEstablishment(JSON.stringify(obj));
    if(resp['error']==false){
     await this.getAllEstablishment();
     swal.fire("Success","Deleted Successfully","success")

    }else{
      swal.fire("Oops","Error while Deleting Record","error")
    }
  }

}
