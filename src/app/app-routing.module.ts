import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './/layouts/layout.component';


import { ProfileComponent } from './pages/profile/profile.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

import { PersonalComponent } from './personal/personal.component';
import { BasicDtlComponent } from './personal/basic-dtl/basic-dtl.component';
import { BankDtlComponent } from './personal/bank-dtl/bank-dtl.component';
import { ProfessionalComponent } from './professional/professional.component';
import { EstablishmentComponent } from './professional/establishment/establishment.component';
import { LeaveComponent } from './professional/leave/leave.component';
import { PostingComponent } from './professional/posting/posting.component';
import { AttendanceComponent } from './professional/attendance/attendance.component';
import { PromotionComponent } from './professional/promotion/promotion.component';
import { ComplaintComponent } from './professional/complaint/complaint.component';
import { LeaveComponent } from './professional/leave/leave.component';
import { LeaveApplicationComponent } from './professional/leave-application/leave-application.component';
import { RetirementComponent } from './professional/retirement/retirement.component';
import { ResignComponent } from './professional/resign/resign.component';
import { TransferComponent } from './professional/transfer/transfer.component';
import { FixPayComponent } from './payroll/fix-pay/fix-pay.component';
import { VariablePayComponent } from './payroll/variable-pay/variable-pay.component';
import {PayrollComponent} from './payroll/payroll.component'
import { DashboardComponent } from './dashboard/dashboard.component';

import { SalaryBillComponent } from './payroll/salary-bill/salary-bill.component';
import { LoanComponent } from './payroll/loan/loan.component';
import { ReportComponent } from './report/report.component';
import { EmpReportComponent } from './report/emp-report/emp-report.component';
import { BillReportComponent } from './report/bill-report/bill-report.component';
import { DedReportComponent } from './report/ded-report/ded-report.component';
import { JoiningComponent } from './joining/joining.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { PayComponent } from './master-data/pay/pay.component';
import { LeaveRuleComponent } from './master-data/leave-rule/leave-rule.component';
import { CodeValueComponent } from './master-data/code-value/code-value.component';

const routes: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {
        "path": "",
        "component": LayoutComponent,
        "children": [
            {
                path:"personal",
                component: PersonalComponent,
                children:[
                    {
                        path: "basic-dtl",
                        component: BasicDtlComponent,
                    },
                    {
                        path: "bank-dtl",
                        component: BankDtlComponent,
                    }
                ]
            },
            {
                path:"professional",
                component: ProfessionalComponent,
                children:[
                    {
                        path: "posting",
                        component: PostingComponent,
                    },
                    {
                        path: "attendance",
                        component: AttendanceComponent,
                    },
                    {
                        path: "establishment",
                        component: EstablishmentComponent,
                    },
                    {
                        path: "leave",
                        component: LeaveComponent,
                    },
                    
                ]
            },
            {
                path:"payroll",
                component: PayrollComponent,
                children:[
                    {
                        path:"fix-pay",
                        component: FixPayComponent
        
                    },
                    {
                        path:"variable-pay",
                        component: VariablePayComponent
        
        
                    },
                    {
                        path:"sal-bill",
                        component: SalaryBillComponent

                    }
                    
                ]
            },
            {
                path:"master-data",
                component: MasterDataComponent,
                children:[
                    {
                        path:"pay",
                        component: PayComponent
        
                    },
                    {
                        path:"leave-rule",
                        component: LeaveRuleComponent
        
        
                    },
                    {
                        path:"code-value",
                        component: CodeValueComponent
        
        
                    },
                    
                    
                ]
            },
            {
                path:"report",
                component: ReportComponent,
                children:[
                    {
                        path:"emp-rpt",
                        component: EmpReportComponent
        
                    },
                    {
                        path:"bill-rpt",
                        component: BillReportComponent
        
        
                    },
                    {
                        path:"ded-rpt",
                        component: DedReportComponent
        
        
                    },
                    
                    
                ]
            },
            {
                path:"joining",
                component: JoiningComponent

            },
            {
                path:"index",
                component: DashboardComponent

            },
            
            
            
            
            
            {
                path: "profile",
                component: ProfileComponent
            },
        ]
    },
    {
        "path": "login",
        "component": LoginComponent
    },
    {
        "path": "register",
        "component": RegisterComponent
    },
    
    {
        "path": "forgot_password",
        "component": ForgotPasswordComponent
    },
    
    {
        "path": "**",
        "redirectTo": "error_404",
        "pathMatch": "full"
    },
];

@NgModule({
  
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ 
    RouterModule,
  ]
})

export class AppRoutingModule { }
