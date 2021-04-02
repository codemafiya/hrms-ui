import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs.min';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  thisMonthSalary=0;
  totalSalary=0;
  absentEmp=0;
  lateEmp=0;
  totalEmp=0;
  activeEmp=0;
  currentTeams=0;
  allTeams=0;
  ngOnInit(): void {
    this.createDesignationChart()
  }
  createDesignationChart(){
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Designation vs Employee"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Junior Engineer" },
          { y: 55, label: "Senior Engineer" },
          { y: 50, label: "Executive Engineer" },
          { y: 65, label: "Superitending Engineer" },
          { y: 95, label: "Chief Engineer" },
          { y: 68, label: "Clerk" },
          { y: 28, label: "Peon" },
          { y: 34, label: "Senior Clerk" },
          { y: 14, label: "Driver" }
        ]
      }]
    });
      
    chart.render();




  }

}
