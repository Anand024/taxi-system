import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DriverModel } from './model/driver.model';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
// import * as $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-bs4';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit, OnDestroy {

  objectKeys: Object;
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any[]> = new Subject();
  driverData: DriverModel[] = [
    new DriverModel('Santosh', 'Patil', '1', 9965778889, 'santu.gouda@gmail.com', '1', 'Male'),
    new DriverModel('Anand', 'Hiremath', '3', 9965778889, 'anandgh87@gmail.com', '2', 'Male'),
    new DriverModel('Raj', 'Patil', '1', 9965778889, 'santu.gouda@gmail.com', '1', 'Male'),
    new DriverModel('Bharat', 'test', '3', 9965778889, 'anandgh87@gmail.com', '2', 'Male'),
    new DriverModel('Suman', 'Patil', '1', 9965778889, 'santu.gouda@gmail.com', '1', 'Male'),
    new DriverModel('Bagat', 'Varen', '3', 9965778889, 'anandgh87@gmail.com', '2', 'Male'),
    new DriverModel('Pramod', 'Patil', '1', 9965778889, 'santu.gouda@gmail.com', '1', 'Male'),
    new DriverModel('Bheem', 'Deren', '3', 9965778889, 'anandgh87@gmail.com', '2', 'Male'),
    new DriverModel('Sanjay', 'Serub', '1', 9965778889, 'santu.gouda@gmail.com', '1', 'Male'),
    new DriverModel('Prashant', 'Karan', '3', 9965778889, 'anandgh87@gmail.com', '2', 'Male'),
    new DriverModel('Santosh', 'Ures', '1', 9965778889, 'santu.gouda@gmail.com', '1', 'Male'),
    new DriverModel('Dinoj', 'Hiremath', '3', 9965778889, 'anandgh87@gmail.com', '2', 'Male'),
    new DriverModel('Santosh', 'Hill', '1', 9965778889, 'santu.gouda@gmail.com', '1', 'Male'),
    new DriverModel('Manoj', 'Hiremath', '3', 9965778889, 'anandgh87@gmail.com', '2', 'Male'),
    new DriverModel('Suraj', 'Gest', '1', 9965778889, 'santu.gouda@gmail.com', '1', 'Male'),
    new DriverModel('Prakash', 'Sereb', '3', 9965778889, 'anandgh87@gmail.com', '2', 'Male')
  ];

  constructor(private http: HttpClient, private chRef: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };

    // this.dtTrigger.next();
  }

  editDriver(event: Event, driver: DriverModel) {
    console.log();
    this.router.navigate([`/driver/editDriver/${driver.driverId}`]);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }
}
