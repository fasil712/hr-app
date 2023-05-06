import { Component, Inject, OnInit } from '@angular/core'; //need to include inject as well
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; //MUST IMPORT MAT_DIALOG_DATA as well to import valuse into our dialog box
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css'],
})
export class CandidateFormComponent implements OnInit {
  //Create our Cadidate Form:
  //NOTE: we have to IMPORT reactive form modules in our app.module.ts
  candidatesForm!: FormGroup;
  beginningHeader: string = 'Add Cadidate Form';
  actionButton: string = 'Save';

  //------------------------------------------------------------------------
  constructor(
    private formBuilder: FormBuilder,
    private candidateService: CandidateService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<CandidateFormComponent>
  ) {}

  ngOnInit(): void {
    //Initialize our form values:
    this.candidatesForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
    });

    if (this.editData) {
      this.candidatesForm.controls['name'].setValue(this.editData.name);
      this.candidatesForm.controls['gender'].setValue(this.editData.gender);
      this.candidatesForm.controls['phone'].setValue(this.editData.phone);
      this.candidatesForm.controls['email'].setValue(this.editData.email);
      this.candidatesForm.controls['address'].setValue(this.editData.address);

      //Change the update button
      this.actionButton = 'Update';

      //update header to say "Edit Cadidate"
      this.beginningHeader = 'Edit Cadidate Form';
    }
  }

  addCadidate(): void {
    if (!this.editData) {
      //Check that the Cadidate form is binding
      console.log(this.candidatesForm.value);

      if (this.candidatesForm.valid) {
        //NOTE: THIS IS OBSERVABLE RETURN VALUE SO MUST USE SUBSCRIBE in ANGULAR 13
        // This is our observer type in our RXJS
        this.candidateService
          .addCandidateApi(this.candidatesForm.value)
          .subscribe({
            next: (res) => {
              alert('Cadidate added succesfully!');
              //Reset the prodcutForm when succesfully Cadidate
              this.candidatesForm.reset();

              //Next we import MatDialogReference of type DialogComponent
              //We then will close the form
              //NOTE: we need to get a Matdialogreference so we can manipulate the form
              //NOTE2: add a messsage in close parameter
              this.dialogRef.close('save');
            },

            error: () => {
              alert('Error while adding the Cadidate');
            },
          });
      } else {
        alert('Please check that values in form are valid');
      }
    } else {
      if (this.candidatesForm.valid) {
        //NOTE: THIS IS OBSERVABLE RETURN VALUE SO MUST USE SUBSCRIBE in ANGULAR 13
        // This is our observer type in our RXJS
        this.candidateService
          .updateCandidateApi(this.editData.id, this.candidatesForm.value)
          .subscribe({
            next: (res) => {
              alert('Cadidate edited succesfully!');
              //Reset the prodcutForm when succesfully Cadidate
              this.candidatesForm.reset();

              //Next we import MatDialogReference of type DialogComponent
              //We then will close the form
              //NOTE: we need to get a Matdialogreference so we can manipulate the form
              //NOTE2: add a messsage in close parameter
              this.dialogRef.close('update');
            },

            error: () => {
              alert('Error while editing the Cadidate');
            },
          });
      } else {
        alert('Please check that values in form are valid');
      }
    }
  }
}
