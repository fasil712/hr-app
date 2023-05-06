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
    'action',
  ];
  dataSource!: MatTableDataSource<Candidate>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private candidateService: CandidateService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllCandidates();
  }

  openDialog() {
    this.dialog
      .open(CandidateFormComponent, {
        width: '30%',
        height: '85%'
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.getAllCandidates();
        }
      });
  }

  //Have to call our Candidates now
  getAllCandidates() {
    this.candidateService.getCandidateApi().subscribe({
      next: (res: Candidate[]) => {
        this.dataSource = new MatTableDataSource(res);
        //Assign our pagination and sort from our ViewChild elements that we declared
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
        //We need to pass the data value
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == 'update') {
          this.getAllCandidates();
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
