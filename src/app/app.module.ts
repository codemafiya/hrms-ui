import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


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

@NgModule({
  declarations: [
    AppComponent,
    PersonalComponent,
    BasicDtlComponent,
    BankDtlComponent,
    ProfessionalComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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