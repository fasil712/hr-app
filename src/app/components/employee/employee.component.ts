import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'employee',
  styleUrls: ['employee.component.css'],
  templateUrl: 'employee.component.html',
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'gender',
    'phone',
    'email',
    'address',
    'department',
    'action',
  ];
  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  departmentList: any[] = [];
  departmentListMap: Map<number, string> = new Map();

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllEmployees();
    this.getDepartmentMap();
  }

  openDialog() {
    this.dialog
      .open(EmployeeFormComponent, {
        width: '30%',
        height: '85%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.getAllEmployees();
        }
      });
  }

  getAllEmployees() {
    this.employeeService.getEmployeeApi().subscribe({
      next: (res: Employee[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching Employee List');
      },
    });
  }

  getDepartmentMap() {
    this.departmentService.getDepartmentApi().subscribe((res) => {
      this.departmentList = res;
      for (let i = 0; i < res.length; i++) {
        this.departmentListMap.set(
          this.departmentList[i].id,
          this.departmentList[i].name
        );
      }
    });
  }

  editEmployee(row: any) {
    this.dialog
      .open(EmployeeFormComponent, {
        width: '30%',
        height: '85%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == 'update') {
          this.getAllEmployees();
        }
      });
  }

  deleteEmployee(id: number) {
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
        this.employeeService.deleteEmployeeApi(id).subscribe({
          next: (res) => {
            this.toastr.success('Employee deleted succesfully!', 'SUCCESS');
            this.getAllEmployees();
          },
          error: (err) => {
            this.toastr.error(
              'Something went wrong with deletion of the Employee!',
              'ERROR'
            );
          },
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
