import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css'],
})
export class CandidateFormComponent implements OnInit {
  candidatesForm!: FormGroup;
  beginningHeader: string = 'Add Cadidate Form';
  actionButton: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private candidateService: CandidateService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editCandidate: any,
    private dialogRef: MatDialogRef<CandidateFormComponent>
  ) {}

  ngOnInit(): void {
    this.candidatesForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
    });

    if (this.editCandidate) {
      this.candidatesForm.controls['name'].setValue(this.editCandidate.name);
      this.candidatesForm.controls['gender'].setValue(this.editCandidate.gender);
      this.candidatesForm.controls['phone'].setValue(this.editCandidate.phone);
      this.candidatesForm.controls['email'].setValue(this.editCandidate.email);
      this.candidatesForm.controls['address'].setValue(this.editCandidate.address);

      this.actionButton = 'Update';
      this.beginningHeader = 'Edit Cadidate Form';
    }
  }

  addCadidate(): void {
    if (!this.editCandidate) {
      if (this.candidatesForm.valid) {
        this.candidateService
          .addCandidateApi(this.candidatesForm.value)
          .subscribe({
            next: (res) => {
              console.log(this.candidatesForm.value);
              this.toastr.success('Cadidate added succesfully!', 'SUCCESS');
              this.candidatesForm.reset();
              this.dialogRef.close('save');
            },

            error: () => {
              this.toastr.error('Error while adding the Cadidate', 'ERROR');
            },
          });
      } else {
        this.toastr.error(
          'Please check that values in form are valid',
          'ERROR'
        );
      }
    } else {
      if (this.candidatesForm.valid) {
        this.candidateService
          .updateCandidateApi(this.editCandidate.id, this.candidatesForm.value)
          .subscribe({
            next: (res) => {
              this.toastr.success('Cadidate edited succesfully!', 'SUCCESS');
              this.candidatesForm.reset();
              this.dialogRef.close('update');
            },
            error: () => {
              this.toastr.error('Error while editing the Cadidate', 'ERROR');
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
