import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatSidenav } from '@angular/material/sidenav';
// import { BreakpointObserver } from '@angular/cdk/layout';
import { Setting } from 'src/app/models/setting';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  id: number = 1;
  companyName: string = '';

  // @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(
    private settingService: SettingService,
    // private observer: BreakpointObserver
  ) {}
  ngOnInit(): void {
    this.settingService.getSettingApi(this.id).subscribe((res: Setting) => {
      this.companyName = res.name;
    });
  }
  // ngAfterViewInit(): void {
  //   this.observer.observe(['(max-width:800px)']).subscribe((res) => {
  //     if (res.matches) {
  //       this.sidenav.mode = 'over';
  //       this.sidenav.close();
  //     } else {
  //       this.sidenav.mode = 'side';
  //       this.sidenav.open();
  //     }
  //   });
  // }
}
