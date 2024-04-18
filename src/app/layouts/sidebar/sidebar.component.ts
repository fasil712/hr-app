import { Component, OnInit, ViewChild } from '@angular/core';
import { Setting } from 'src/app/models/setting';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  id: number = 1;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  isExpanded: boolean = true;

  constructor(private settingService: SettingService) {}
  ngOnInit(): void {
    this.settingService.getSettingApi(this.id).subscribe((res: Setting) => {
      this.companyName = res.name;
      this.companyEmail = res.email;
      this.companyPhone = res.phone;
    });
  }
}
