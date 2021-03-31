import { Component, OnInit } from '@angular/core';
import {JoiningService} from '../service/joining.service';
import {MainService} from '../service/main.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-joining',
  templateUrl: './joining.component.html',
  styleUrls: ['./joining.component.css']
})
export class JoiningComponent implements OnInit {

  constructor(public mainService : MainService,private joinService : JoiningService) { }
  joiningObj={}
  gender=[{code:'M',value:'MALE'},{code:'F',value:'FEMALE'}]
  status=[{code:'A',value:'ACTIVE'},{code:'I',value:'INACTIVE'}]
  ngOnInit() {
  }
  async submit(){
    this.joiningObj['acct_id'] = this.mainService.acct_id;
    var resp = await this.joinService.addJoining(this.joiningObj);
    if(resp['error'] == false){
      swal.fire('Success...', 'Joining Complete!', 'success')

    }else{
      swal.fire('Oops...', 'Something went wrong!', 'error')

    }
  }

}
