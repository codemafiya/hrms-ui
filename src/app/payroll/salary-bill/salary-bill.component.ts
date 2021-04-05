import { Component, OnInit,ViewChild } from '@angular/core';
import { AllFixPayService } from "../../service/fix-pay.servive";
import { AllEmpService} from '../../service/all-emp.service';
import { BillService} from '../../service/bill.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert2';
import {MainService} from '../../service/main.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Swal from 'sweetalert2';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  billItems=[];
  printItems=[];
  async getBillItems(id){
    this.printItems=[];
    this.billItems = [];
    var obj = {acct_id: this.mainService.acct_id,id : id};
    console.log(obj);
    var resp = await this.billService.getBillItems(JSON.stringify(obj));
    console.log(resp);
    if(resp['error'] == false){
      this.billItems = resp['data'];
      var lookupObj = {};
      for(var i=0;i<this.billItems.length;i++){
        if(lookupObj[this.billItems[i]['emp_id']] == undefined){
          lookupObj[this.billItems[i]['emp_id']]={emp_id: this.billItems[i]['emp_id'],emp_name:this.billItems[i]['emp_first_name']+" "+this.billItems[i]['emp_last_name'],pay:0,ded:0};

        }
        if(this.billItems[i]['pay_type_cd']=='PAY'){
          lookupObj[this.billItems[i]['emp_id']]['pay']+=this.billItems[i]['amount'];
        }else{
          lookupObj[this.billItems[i]['emp_id']]['ded']+=this.billItems[i]['amount'];

        }
      }
      var keys = Object.keys(lookupObj);
      for(var i=0;i<keys.length;i++){
        var ob = lookupObj[keys[i]];
        //ob['emp_id'] = keys[i];
        this.printItems.push(ob);
      }
    }else{
      Swal.fire("Oops","Error while getting Bill Items","error");
    }


  }
  async printBill(element){
    await this.getBillItems(element.id);
    console.log(this.printItems);
    if(this.printItems.length == 0){
      Swal.fire("Oops","No Bill Item Found","error");
      return;
    }
    var txt = "Tech Infoware Pvt Ltd , Lucknow "
    var dd = {
      pageSize: 'A4',
      footer: function(currentPage, pageCount) { 
        var arr1 = []
        var obb1 = {text: currentPage.toString() + ' of ' + pageCount, alignment: 'center', margin: [72, 40], bold: true, style: 'header' }
        arr1.push(obb1)
        return arr1 },
      header: function (currentPage, pageCount) {
        var arr = []
        var obj = { text: txt, alignment: 'center', margin: [72, 40], fontSize: 15, bold: true, style: 'header' };
        arr.push(obj);

        return arr;
      },
      pageOrientation: 'portrait',
      pageMargins: [40, 60, 40, 60],
      content: [

      ]
    };

    dd.content.push({ text: "SALARY BILL", bold: true, alignment: 'center' });

    dd.content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 520, y2: 0, lineWidth: 0.5 }] });

    dd.content.push({text:"    "})
    dd.content.push({text:"    "})
    var header1 = {
      columns: [
        {
          width: '*',
          text: "Bill Desc :",
          bold: true,
          alignment: 'left'
        },
        {
          width: '*',
          text: element['bill_desc'],
          bold: false,
          alignment: 'left'
        },
        {
          width: '*',
          text: "Bill Date :",

          bold: true,
          alignment: 'left'
        },
        {
          width: '*',
          text: element['bill_dt'].split('T')[0],

          bold: false,
          alignment: 'right'
        }

      ],


    }
    dd.content.push(header1);
    dd.content.push({text:"    "})
    dd.content.push({text:"    "})
    var header2 = {
      columns: [
        {
          width: '*',
          text: "Bill Amount :",
          bold: true,
          alignment: 'left'
        },
        {
          width: '*',
          text: element['bill_amt'],
          bold: false,
          alignment: 'left'
        },
        {
          width: '*',
          text: "Year and Month :",

          bold: true,
          alignment: 'left'
        },
        {
          width: '*',
          text: element['month']+"/"+element['year'],

          bold: false,
          alignment: 'right'
        }

      ],


    }
    dd.content.push(header2);
    dd.content.push({text:"    "})
    dd.content.push({text:"    "})
    dd.content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 520, y2: 0, lineWidth: 0.5 }] });

    dd.content.push({text:"    "})
    dd.content.push({text:"    "})
    var tbl = {

      // layout: 'lightHorizontalLines',
      fontSize: 10,
      table: {

        headerRows: 1,
        widths: ['*', '*', '*','*','*'],

        body: [
          [{ text: 'SR NO.', alignment: 'left', bold: true },
          { text: 'Emp Dtl', alignment: 'left', bold: true },
          { text: 'Gross', alignment: 'right', bold: true },
          { text: 'Deduction', alignment: 'right', bold: true },
          { text: 'Net', alignment: 'right', bold: true }]
        ]
      }
    };
    for(var i=0;i<this.printItems.length;i++){
      var arr=[];
      arr.push({text: i+1,bold : true});
      arr.push({text:this.printItems[i]['emp_id']+" - "+this.printItems[i]['emp_name'],bold : true});
      arr.push({ text: this.printItems[i]['pay'], alignment: 'right'});
      arr.push({ text: this.printItems[i]['ded'], alignment: 'right'});
      arr.push({text:(this.printItems[i]['pay'] - this.printItems[i]['ded']), alignment: 'right',bold: true});
      tbl.table.body.push(arr);
    }
    dd.content.push(tbl);
    dd.content.push({text:"    "})
    dd.content.push({text:"    "})
    var header3 = {
      columns: [
        {
          width: '*',
          text: "Prepared By :",
          bold: true,
          alignment: 'center'
        },
        {
          width: '*',
          text: "Checked By :",
          bold: true,
          alignment: 'center'
        },
        {
          width: '*',
          text: "Passed By :",

          bold: true,
          alignment: 'center'
        },
        

      ],


    }
    dd.content.push(header3);
    pdfMake.createPdf(dd).download('bill' + '.pdf');

    //dd.content.push({ text: " " });
    //dd.content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 760, y2: 0, lineWidth: 0.5 }] });

  }

}
