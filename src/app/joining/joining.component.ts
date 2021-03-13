import { Component, OnInit } from '@angular/core';
import {JoiningService} from '../service/joining.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-joining',
  templateUrl: './joining.component.html',
  styleUrls: ['./joining.component.css']
})
export class JoiningComponent implements OnInit {

  constructor(private joinService : JoiningService) { }
  joiningObj={}
  gender=[{code:'M',value:'MALE'},{code:'F',value:'FEMALE'}]
  ngOnInit() {
  }
  async submit(){
    console.log(this.joiningObj);
    var resp = await this.joinService.addJoining(this.joiningObj);
    console.log(resp);
    if(resp['error'] == true){
      swal.fire('Success...', 'Joining Complete!', 'success')

    }else{
      swal.fire('Oops...', 'Something went wrong!', 'error')

    }
  }

}
