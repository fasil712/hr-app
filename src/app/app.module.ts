import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentComponent } from './components/department/department.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialsModule } from './materials/materials.module';
import { CandidateFormComponent } from './components/candidate/candidate-form/candidate-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidateService } from './services/candidate.service';
import { EmployeeService } from './services/employee.service';
import { DepartmentService } from './services/department.service';
import { SalaryService } from './services/salary.service';
import { SettingService } from './services/setting.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CandidateComponent,
    EmployeeComponent,
    DepartmentComponent,
    CandidateFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
    HttpClientModule,
    MaterialsModule,
  ],
  providers: [
    CandidateService,
    EmployeeService,
    DepartmentService,
    SalaryService,
    SettingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
