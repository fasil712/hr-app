import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Setting } from 'src/app/models/setting';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settingForm!: FormGroup<any>;
  id: number = 1;

  constructor(
    private settingService: SettingService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.settingService.getSettingApi(this.id).subscribe((res: Setting) => {
      this.settingForm.patchValue(res);
    });
    this.setUpForms();
  }
  setUpForms() {
    this.settingForm = new FormGroup({
      id: new FormControl(1),
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required),
    });
  }

  submitSettings() {
    if (this.settingForm.valid) {
      this.settingService
        .updateSettingApi(this.id, this.settingForm.value)
        .subscribe(
          (res) => {
            this.toastr.success('Setting updated succesfully!', 'SUCCESS');
          },
          (error) => {
            this.toastr.error('Error while updating the Setting', 'ERROR');
          }
        );
    } else {
      this.toastr.error('Please check that values in form are valid', 'ERROR');
    }
  }
}
