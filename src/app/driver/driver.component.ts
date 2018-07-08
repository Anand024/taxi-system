import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DriverModel } from './model/driver.model';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DriverService } from '../common/driver.service';
import { BaseApiService } from '../common/baseApi.service';
import { DataTableDirective } from 'angular-datatables';
// import * as $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-bs4';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  objectKeys: Object;
  // dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  // dtTrigger: Subject<any[]> = new Subject();
  driverData: DriverModel[] = [];

  constructor(private http: HttpClient, private driverService: DriverService, private spinnerService: Ng4LoadingSpinnerService,
    private cde: ChangeDetectorRef, private router: Router, private baseApiService: BaseApiService) {}

  ngOnInit() {
    this.spinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };
    this.loadData();
  }

  loadData() {
    const userId = this.baseApiService.getUserId();
    const apiToken = this.baseApiService.getApiToken();
    const result = this.driverService.loadAllDriverData(userId, apiToken).subscribe(res => {
      if (res) {
        this.driverData = res;
        this.dtTrigger.next();
      }
      this.cde.detectChanges();
      this.cde.markForCheck();
    });
    if (result) {
      this.spinnerService.hide();
    }
  }
  deleteDriver(driverId, index) {
    const apiToken = this.baseApiService.getApiToken();
    const userId = this.baseApiService.getUserId();
      this.driverService.deleteDriver(driverId, userId, apiToken).subscribe(res => {
        // this.driverData = res;
        this.driverData.splice(index, 1);
        // this.loadData();
        // this.cde.detectChanges();
        // this.cde.markForCheck();
      });
  }

  editDriver(event: Event, driver: DriverModel) {
    this.router.navigate([`/driver/editDriver/${driver.driverId}`]);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }
}
