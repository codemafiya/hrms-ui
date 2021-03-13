import { Component, OnInit } from '@angular/core';
import { AllEmpService} from '../../service/all-emp.service';
@Component({
  selector: 'app-basic-dtl',
  templateUrl: './basic-dtl.component.html',
  styleUrls: ['./basic-dtl.component.css']
})
export class BasicDtlComponent implements OnInit {

  constructor(private empservice:AllEmpService ) { }
  data=[]
  async ngOnInit() {
    console.log("Hello");
    await this.getEmployeepersonalinfo();
    
  }

  async getEmployeepersonalinfo(){

    var resp = await this.empservice.getEmployeeMasterData();
    console.log(resp);
    if(resp['error']==false){
      this.data = resp.data;
    }else{

    }
  }

}
