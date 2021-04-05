import { Component, OnInit,ViewChild } from '@angular/core';
import { MasterDataService } from "../../service/master-data.service";
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert2';
import {MainService} from '../../service/main.service';
@Component({
  selector: 'app-code-value',
  templateUrl: './code-value.component.html',
  styleUrls: ['./code-value.component.css']
})
export class CodeValueComponent implements OnInit {

  constructor(public mainService: MainService,private masterDataService: MasterDataService) { }
  data = []
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  datasource=new MatTableDataSource(this.data);
  displayedColumns: string[] = ['id','field_name', 'code', 'value', 'status','action'];
  
 
  allCodeValue=[]
  codeValueObj = {}
  fields=[]
  async ngOnInit() {
    await this.getCodeValue();
    await this.getFields()
    

  }
  async getFields(){
    

    var resp = await this.masterDataService.getFields();
    console.log(resp);
    if(resp['error']==false){
      this.fields = resp.data;
      
    }else{

    }
  }
  async getCodeValue(){
    var obj = {acct_id : this.mainService.acct_id};

    var resp = await this.masterDataService.getCodeValue(JSON.stringify(obj));
    if(resp['error']==false){
      this.data = resp.data;
      this.datasource = new MatTableDataSource(this.data)
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    }else{

    }
  }
  
  async submitCodeValue(){
    this.codeValueObj['acct_id'] = this.mainService.acct_id;
    var resp = await this.masterDataService.createCodeValue(this.codeValueObj);
    if(resp['error'] == false){
      await this.getCodeValue()
      swal.fire('Success...', 'Code Value Added Successfully!', 'success')

    }else{
      swal.fire('Oops...', 'Something went wrong!', 'error')

    }
  }
  async deleteCodeValue(element){
    var obj = {acct_id : this.mainService.acct_id,id : element.id};

    var resp  = await this.masterDataService.deleteCodeValue(JSON.stringify(obj));
    if(resp['error'] == false){
      await this.getCodeValue()
      swal.fire('Success...', 'Code Value Deleted Successfully!', 'success');


    }else{
      swal.fire('Oops...', 'Something went wrong!', 'error')

    }
  }
 
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}
