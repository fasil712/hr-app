import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateComponent } from './components/candidate/candidate.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentComponent } from './components/department/department.component';
import { SalaryComponent } from './components/salary/salary.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'candidates',
    component: CandidateComponent,
  },
  {
    path: 'employees',
    component: EmployeeComponent,
  },
  {
    path: 'departments',
    component: DepartmentComponent,
  },
  {
    path: 'salary',
    component: SalaryComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
