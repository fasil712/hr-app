import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { MatDialog } from '@angular/material/dialog';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-candidate',
  styleUrls: ['candidate.component.css'],
  templateUrl: 'candidate.component.html',
})
export class CandidateComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'gender',
    'phone',
    'email',
    'address',
    'employeeId',
    'action',
  ];
  dataSource!: MatTableDataSource<Candidate>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  employeeList: Employee[];
  employeeNameMap: Map<number, string> = new Map();
  constructor(
    private candidateService: CandidateService,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllCandidates();
    this.getEmployeeNameMap();
  }

  openDialog() {
    this.dialog
      .open(CandidateFormComponent, {
        width: '30%',
        height: '85%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.getAllCandidates();
        }
      });
  }

  getAllCandidates() {
    this.candidateService.getCandidateApi().subscribe({
      next: (res: Candidate[]) => {
        this.dataSource = new MatTableDataSource(res.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching Candidate List');
      },
    });
  }

  editCandidate(row: any) {
    this.dialog
      .open(CandidateFormComponent, {
        width: '30%',
        height: '85%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == 'update') {
          this.getAllCandidates();
        }
      });
  }

  getEmployeeNameMap() {
    this.employeeService.getEmployeeApi().subscribe((res) => {
      this.employeeList = res;
      for (let i = 0; i < this.employeeList.length; i++) {
        this.employeeNameMap.set(
          this.employeeList[i].id,
          this.employeeList[i].name
        );
      }
    });
  }

  deleteCandidate(id: number) {
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
        this.candidateService.deleteCandidateApi(id).subscribe({
          next: (res) => {
            this.toastr.success('Cadidate deleted succesfully!', 'SUCCESS');
            this.getAllCandidates();
          },
          error: (err) => {
            this.toastr.error(
              'Something went wrong with deletion of the Candidate!',
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
