import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FlexLayoutModule } from '@angular/flex-layout';



import { AppComponent } from './/app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LayoutModule } from './/layouts/layout.module';
import { ScriptLoaderService } from './_services/script-loader.service';
import { PersonalComponent } from './personal/personal.component';
import { BasicDtlComponent } from './personal/basic-dtl/basic-dtl.component';
import { BankDtlComponent } from './personal/bank-dtl/bank-dtl.component';
import { ProfessionalComponent } from './professional/professional.component';
import { EstablishmentComponent } from './professional/establishment/establishment.component';
import { PostingComponent } from './professional/posting/posting.component';
import { AttendanceComponent } from './professional/attendance/attendance.component';
import { PromotionComponent } from './professional/promotion/promotion.component';
import { ComplaintComponent } from './professional/complaint/complaint.component';
import { LeaveComponent } from './professional/leave/leave.component';
import { LeaveApplicationComponent } from './professional/leave-application/leave-application.component';
import { RetirementComponent } from './professional/retirement/retirement.component';
import { ResignComponent } from './professional/resign/resign.component';
import { TransferComponent } from './professional/transfer/transfer.component';
import {PayrollComponent} from './payroll/payroll.component'
import { FixPayComponent } from './payroll/fix-pay/fix-pay.component';
import { VariablePayComponent } from './payroll/variable-pay/variable-pay.component';
import { SalaryBillComponent } from './payroll/salary-bill/salary-bill.component';
import { LoanComponent } from './payroll/loan/loan.component';
import { ReportComponent } from './report/report.component';
import { EmpReportComponent } from './report/emp-report/emp-report.component';
import { BillReportComponent } from './report/bill-report/bill-report.component';
import { DedReportComponent } from './report/ded-report/ded-report.component';
import { JoiningComponent } from './joining/joining.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MasterDataComponent } from './master-data/master-data.component';
import { PayComponent } from './master-data/pay/pay.component';
import { LeaveRuleComponent } from './master-data/leave-rule/leave-rule.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonalComponent,
    BasicDtlComponent,
    BankDtlComponent,
    RegisterComponent,
    PayrollComponent,
    ProfessionalComponent,
    ForgotPasswordComponent,
    LoginComponent,
    ProfileComponent,
    EstablishmentComponent,
    PostingComponent,
    AttendanceComponent,
    PromotionComponent,
    ComplaintComponent,
    LeaveComponent,
    LeaveApplicationComponent,
    RetirementComponent,
    ResignComponent,
    TransferComponent,
    FixPayComponent,
    VariablePayComponent,
    SalaryBillComponent,
    LoanComponent,
    ReportComponent,
    EmpReportComponent,
    BillReportComponent,
    DedReportComponent,
    JoiningComponent,
    MasterDataComponent,
    PayComponent,
    LeaveRuleComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    NgSelectModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ScriptLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
