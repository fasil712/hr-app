import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/services/candidate.service';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  employeesCount = 0;
  candidatesCount = 0;
  departmentsCount = 0;
  recentCandidates = [];

  constructor(
    private employeeService: EmployeeService,
    private candidateService: CandidateService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.employeeService
      .getEmployeeApi()
      .subscribe((count) => (this.employeesCount = count.length));
    this.candidateService
      .getCandidateApi()
      .subscribe((count) => (this.candidatesCount = count.length));
    this.departmentService
      .getDepartmentApi()
      .subscribe((count) => (this.departmentsCount = count.length));
    this.candidateService
      .getCandidateApi()
      .subscribe((candidates) => (this.recentCandidates = candidates));
  }

  viewEmployees() {
    // navigate to employees page
  }

  viewCandidates() {
    // navigate to candidates page
  }

  viewDepartments() {
    // navigate to departments page
  }
}
