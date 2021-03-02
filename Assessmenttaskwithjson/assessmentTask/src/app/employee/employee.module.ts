import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { routing } from './employee.routing';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { DatatableModule } from '../common/datatable/datatable.module';
import { CKEditorModule } from 'ngx-ckeditor';
import { PaginationModule} from '../common/pagination/pagination.module';
import { ConfirmModalModule } from "../common/confirm-modal/confirm-modal.module";

@NgModule({
  declarations: [
    AddEmployeeComponent,
    EmployeeListComponent,
    ViewEmployeeComponent
  ],
  imports: [
    DatatableModule,
    PaginationModule,
    CKEditorModule,
    ConfirmModalModule,
    routing,
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class EmployeeModule { }
