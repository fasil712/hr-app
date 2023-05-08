import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  departmentList!: Observable<Department[]>;
  employeeForm!: FormGroup;
  beginningHeader: string = 'Add Employee Form';
  actionButton: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editEmployee: any,
    private dialogRef: MatDialogRef<EmployeeFormComponent>
  ) {}

  ngOnInit(): void {
    this.departmentList = this.departmentService.getDepartmentApi();
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      address: ['', Validators.required],
      departmentId: ['', Validators.required],
    });
    if (this.editEmployee) {
      this.employeeForm.controls['name'].setValue(this.editEmployee.name);
      this.employeeForm.controls['gender'].setValue(this.editEmployee.gender);
      this.employeeForm.controls['phone'].setValue(this.editEmployee.phone);
      this.employeeForm.controls['email'].setValue(this.editEmployee.email);
      this.employeeForm.controls['address'].setValue(this.editEmployee.address);
      this.employeeForm.controls['departmentId'].setValue(
        this.editEmployee.departmentId
      );

      this.actionButton = 'Update';
      this.beginningHeader = 'Edit Employee Form';
    }
  }

  addEmployee(): void {
    if (!this.editEmployee) {
      if (this.employeeForm.valid) {
        this.employeeService.addEmployeeApi(this.employeeForm.value).subscribe({
          next: (res) => {
            this.toastr.success('Employee added succesfully!', 'SUCCESS');
            this.employeeForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            this.toastr.error('Error while adding the Employee', 'ERROR');
          },
        });
      } else {
        this.toastr.error(
          'Please check that values in form are valid',
          'ERROR'
        );
      }
    } else {
      if (this.employeeForm.valid) {
        this.employeeService
          .updateEmployeeApi(this.editEmployee.id, this.employeeForm.value)
          .subscribe({
            next: (res) => {
              this.toastr.success('Employee edited succesfully!', 'SUCCESS');
              this.employeeForm.reset();
              this.dialogRef.close('update');
            },
            error: () => {
              this.toastr.error('Error while editing the Employee', 'ERROR');
            },
          });
      } else {
        this.toastr.error(
          'Please check that values in form are valid',
          'ERROR'
        );
      }
    }
  }
}
