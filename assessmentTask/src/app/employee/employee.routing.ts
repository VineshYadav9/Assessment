import { RouterModule, Routes } from "@angular/router";
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

export const routes: Routes = [
  {
    path: 'employee-list',
    component: EmployeeListComponent
  },
  
  {
    path: 'add-employee',
    component: AddEmployeeComponent
  },
  {
    path: 'edit-employee/:id',
    component: AddEmployeeComponent
  },
  {
    path: 'view-employee/:id',
    component: ViewEmployeeComponent
  }

];
export const routing = RouterModule.forChild(routes);
