import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { AddEditOperation, Salary } from 'src/app/models/salary';
import { EmployeeService } from 'src/app/services/employee.service';
import { SalaryService } from 'src/app/services/salary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css'],
})
export class SalaryComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'employee',
    'salary',
    'description',
    'action',
  ];
  dataSource!: MatTableDataSource<Salary>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  salaryForm!: FormGroup;
  submitted: boolean = false;
  buttonText!: string;
  addEditOperation!: AddEditOperation;

  employeeList: Employee[] = [];
  employeeListMap: Map<number, string> = new Map();

  constructor(
    private salaryService: SalaryService,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getEmployeeSalaries();
    this.setupFormGroups();
    this.getEmployees();
  }

  setupFormGroups() {
    this.buttonText = 'Save';
    this.addEditOperation = AddEditOperation.add;
    this.salaryForm = new FormGroup({
      id: new FormControl(0),
      employeeId: new FormControl(0, Validators.required),
      salary: new FormControl(0, Validators.required),
      description: new FormControl(''),
    });
  }

  get controls() {
    return this.salaryForm.controls;
  }

  getEmployeeSalaries() {
    this.salaryService.getSalaryApi().subscribe({
      next: (res: Salary[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.toastr.error('Error while fetching Salary List', 'ERROR');
      },
    });
  }

  getEmployees() {
    this.employeeService.getEmployeeApi().subscribe((res: Employee[]) => {
      this.employeeList = res;
      for (let i = 0; i < res.length; i++) {
        this.employeeListMap.set(
          this.employeeList[i].id,
          this.employeeList[i].name
        );
      }
    });
  }

  submitSalary() {
    this.submitted = true;
    if (this.salaryForm.invalid) {
      return;
    }
    switch (this.addEditOperation) {
      case AddEditOperation.add:
        this.salaryService.addSalaryApi(this.salaryForm.value).subscribe(
          (res) => {
            this.toastr.success('Salary added succesfully!', 'SUCCESS');
            this.resetForm();
            this.getEmployeeSalaries();
          },
          (err) => {
            this.toastr.error('Error while adding of the Salary', 'ERROR');
          }
        );
        break;
      case AddEditOperation.update:
        this.salaryService.updateSalaryApi(this.salaryForm.value).subscribe(
          (res) => {
            this.toastr.success('Salary edited succesfully!', 'SUCCESS');
            this.resetForm();
            this.getEmployeeSalaries();
          },
          (err) => {
            this.toastr.error('Error while editing of the Salary', 'ERROR');
          }
        );
        break;
    }
  }

  resetForm() {
    this.submitted = false;
    this.salaryForm.reset();
    this.buttonText = 'Save';
    this.addEditOperation = AddEditOperation.add;
  }

  updateSalary(id: number) {
    this.buttonText = 'Update';
    this.addEditOperation = AddEditOperation.update;
    this.salaryService.getSalaryByIdApi(id).subscribe((res) => {
      this.salaryForm.patchValue(res);
    });
  }

  deleteSalary(id: number) {
    Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.salaryService.deleteSalaryApi(id).subscribe({
          next: (res) => {
            this.toastr.success('Salary deleted succesfully!', 'SUCCESS');
            this.getEmployeeSalaries();
          },
          error: (err) => {
            this.toastr.error(
              'Something went wrong with deletion of the Salary!',
              'ERROR'
            );
          },
        });
      }
    });
  }
}
