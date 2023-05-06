import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddEditOperation, Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  dataSource!: MatTableDataSource<Department>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  departmentForm!: FormGroup;
  submitted: boolean = false;
  buttonText!: string;
  addEditOperation!: AddEditOperation;

  constructor(
    private departmentService: DepartmentService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllDepartments();
    this.setupFormGroups();
  }

  setupFormGroups() {
    this.buttonText = 'Save';
    this.addEditOperation = AddEditOperation.add;
    this.departmentForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern('[a-zA-Z ]*'),
        ])
      ),
      description: new FormControl('', Validators.required),
    });
  }

  get controls() {
    return this.departmentForm.controls;
  }
  //Have to call our department now
  getAllDepartments() {
    this.departmentService.getDepartmentApi().subscribe({
      next: (res: Department[]) => {
        this.dataSource = new MatTableDataSource(res);
        //Assign our pagination and sort from our ViewChild elements that we declared
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching Department List');
      },
    });
  }

  addDepartment() {
    this.submitted = true;
    if (this.departmentForm.invalid) {
      return;
    }
    switch (this.addEditOperation) {
      case AddEditOperation.add:
        this.departmentService
          .addDepartmentApi(this.departmentForm.value)
          .subscribe(
            (res) => {
              this.toastr.success('Department added succesfully!', 'SUCCESS');
              this.resetForm();
              this.getAllDepartments();
            },
            (err) => {
              this.toastr.error('Error while adding the Department', 'ERROR');
            }
          );
        break;
      case AddEditOperation.update:
        this.departmentService
          .updateDepartmentApi(this.departmentForm.value)
          .subscribe(
            (res) => {
              this.toastr.success('Department edited succesfully!', 'SUCCESS');
              this.resetForm();
              this.getAllDepartments();
            },
            (err) => {
              this.toastr.error('Error while adding the Department', 'ERROR');
            }
          );
        break;
    }
  }

  resetForm() {
    this.submitted = false;
    this.departmentForm.reset();
    this.buttonText = 'Save';
    this.addEditOperation = AddEditOperation.add;
  }

  updateDepartment(id: number) {
    this.buttonText = 'Update';
    this.addEditOperation = AddEditOperation.update;
    this.departmentService.getDepartmentByIdApi(id).subscribe((res) => {
      this.departmentForm.patchValue(res);
    });
  }

  deleteDepartment(id: number) {
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
        this.departmentService.deleteDepartmentApi(id).subscribe({
          next: (res) => {
            this.toastr.success('Department deleted succesfully!', 'SUCCESS');
            this.getAllDepartments();
          },
          error: (err) => {
            this.toastr.error(
              'Something went wrong with deletion of the Department!',
              'ERROR'
            );
          },
        });
      }
    });
  }
}
