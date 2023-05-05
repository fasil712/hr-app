import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-candidate',
  styleUrls: ['candidate.component.css'],
  templateUrl: 'candidate.component.html',
})
export class CandidateComponent implements OnInit {
  cadidateList$: Candidate[] = [];
  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'address'];
  dataSource!: MatTableDataSource<Candidate>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private candidateService: CandidateService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCandidates();
  }
  getCandidates() {
    this.candidateService.getCandidateApi().subscribe((res: Candidate[]) => {
      this.cadidateList$ = res;
      this.dataSource = new MatTableDataSource(this.cadidateList$);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  removeData() {
    this.toastr.success('Success', 'Removed!!!');
  }
  addData() {
    this.toastr.success('Success', 'Added!!!');
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
