import { Component } from '@angular/core';
import {MainService} from '../../service/main.service';
@Component({
  selector: '[app-sidebar]',
  templateUrl: './app-sidebar.component.html'
})
export class AppSidebar {
  constructor(public mainService : MainService) { }

  ngOnInit() {}
}
