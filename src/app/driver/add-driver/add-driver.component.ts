import { Component, OnInit, ViewChild } from '@angular/core';
import {IMyDpOptions} from 'angular4-datepicker/src/my-date-picker';
import { FileUploadService } from '../../common/service/file-upload.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AddDriverDataModel } from '../model/driverData.model';
import { BaseApiService } from '../../common/baseApi.service';
import { DriverService } from '../../common/driver.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

  @ViewChild('personalDetails') personalDetails: NgForm;
  @ViewChild('licencing') licencing: NgForm;

  driverId: string;
  driverData: AddDriverDataModel[] = [];
  statesList: any[] = [];
  countryList: any[] = [];
  cityList: any[] = [];

  constructor(private fileUploadService: FileUploadService, private route: ActivatedRoute,
    private baseApiService: BaseApiService, private driverService: DriverService) { }

  public hireDateOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };

// Initialized to specific date (09.10.2018).
  public hireDate: any = {
    date: { year: 2018, month: 10, day: 9 }
  };

  public expiryDateOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };

  public expiryDate: any = { date: { year: 2018, month: 10, day: 9 } };

  public insurenceExpiryDateOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };

  public insurenceExpiryDate: any = { date: { year: 2018, month: 10, day: 9 } };

  // file uploader
  fileToUpload: File = null;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }

  getDriverDetails(driverId: string) {
      // call service
  }
  ngOnInit() {
    const userId = this.baseApiService.getUserId();
    const apiToken = this.baseApiService.getApiToken();
    this.driverService.loadState(userId, apiToken).subscribe(response => {
      if (response) {
        this.statesList = response;
      }
    });
    this.driverService.loadCountry(userId, apiToken).subscribe(response => {
      if (response) {
        this.countryList = response;
      }
    });
    this.driverService.loadCity(userId, apiToken).subscribe(response => {
      if (response) {
        this.cityList = response;
      }
    });
    if (this.route.routeConfig.path === 'driver/editDriver/:driverId') {
      this.route && this.route.params.subscribe((params) => {
        this.driverId = params['driverId'];
        if(this.driverId) {
          this.getDriverDetails(this.driverId);
        }
      });
    } else {
      this.driverId = '';
    }
  }

}
