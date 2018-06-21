import { Component, OnInit, ViewChild } from '@angular/core';
import {IMyDpOptions} from 'angular4-datepicker/src/my-date-picker';
import { FileUploadService } from '../../common/service/file-upload.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AddDriverDataModel } from '../model/driverData.model';
import { BaseApiService } from '../../common/baseApi.service';
import { DriverService } from '../../common/driver.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs/Observable';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

  @ViewChild('personalDetails') personalDetails: NgForm;
  @ViewChild('licencing') licencing: NgForm;
  @ViewChild('fileInput') fileInput;
  selectedFiles: FileList;
  currentFileUpload: File;
  userId: string;
  // queue: Observable<FileQueueObject[]>;
  driverId: string;
  driverData: AddDriverDataModel;
  statesList: any[] = [];
  countryList: any[] = [];
  cityList: any[] = [];
  cabList: any[] = [];

  constructor(private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService,
    private baseApiService: BaseApiService, private driverService: DriverService, public uploader: FileUploadService) {
      this.driverData = new AddDriverDataModel();
    }

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

  addOrUpdateDriverData(isAdd: boolean) {
    const userId = this.baseApiService.getUserId();
    const apiToken = this.baseApiService.getApiToken();
    this.setDefault();
    this.setDefaultFields();
    if (isAdd) {
      this.driverService.saveDriverData(userId, this.driverData, apiToken).subscribe(res => {
        console.log('add success');
      });
    } else {
      this.driverService.updateDriverData(userId, this.driverData, apiToken).subscribe(res => {
        if (res) {
          this.driverData = res;
        }
        console.log('update success');
      });
    }
  }

  setDefaultFields() {
    this.driverData.address = 'Rajajinagar';
    this.driverData.driverAttribteId = 0;
    this.driverData.driverDocumentId = 0;
    this.driverData.driverId = 0;
    this.driverData.startDate = this.driverData.startDate.epoc || 0;
    this.driverData.driverLicenceExpiry = this.driverData.driverLicenceExpiry.epoc || 0;
  }

  handleFileInput(files: FileList) {
    // this.fileToUpload = files.item(0);
    // handle for png jpg pdf
    this.uploadFileToActivity();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    const name = event.target.name;
    if (this.selectedFiles) {
      this.upload(name);
    }
  }
  setUploadFilesValue(name) {

  }
  upload(name: string) {
    const apiToken = this.baseApiService.getApiToken();
    this.currentFileUpload = this.selectedFiles.item(0);
    this.driverData[name] = this.currentFileUpload.name;
    this.uploader.pushFileToStorage(this.currentFileUpload, apiToken).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;
  }
  uploadFileToActivity() {
    const userId = this.baseApiService.getUserId();
    const apiToken = this.baseApiService.getApiToken();
    const fileBrowser = this.fileInput.nativeElement;
    // this.uploader.addToQueue(fileBrowser.files);
    this.uploader.postFile(fileBrowser.files, userId, apiToken).subscribe(data => {
      // do something, if upload success
      console.log(data);
      }, error => {
        console.log(error);
      });
  }

  getDriverDetails(driverId: string) {
      // call service
      const apiToken = this.baseApiService.getApiToken();
      this.driverService.loadDriverDataById(driverId, this.userId, apiToken).subscribe(res => {
        this.driverData = res;
      });
  }

  setDefault() {
    this.driverData.mobileNo = this.driverData.mobileNo || 0;
    this.driverData.firstName = this.driverData.firstName || '';
      this.driverData.lastName = this.driverData.lastName || '';
      this.driverData.countryId = this.driverData.countryId || 0;
      this.driverData.mobileNo = this.driverData.mobileNo || 0;
      this.driverData.password = this.driverData.password || '';
      this.driverData.stateId = this.driverData.stateId || 0;
      this.driverData.cityId = this.driverData.cityId || 0;
      this.driverData.sex = this.driverData.sex || '';
      this.driverData.email = this.driverData.email || '';
      this.driverData.zip = this.driverData.zip || '';
      this.driverData.pets = this.driverData.pets || '';
      this.driverData.status = this.driverData.status || 0;
      this.driverData.photo = this.driverData.photo || '';
      this.driverData.policeDisclose = this.driverData.policeDisclose || '';
      this.driverData.proofOfAddress = this.driverData.proofOfAddress || '';
      this.driverData.startDate = this.driverData.startDate || 0;
      this.driverData.street = this.driverData.street || '';
      this.driverData.topman = this.driverData.topman || '';
      this.driverData.uniformed = this.driverData.uniformed || '';
      this.driverData.otherPhone = this.driverData.otherPhone || 0;
      this.driverData.crb = this.driverData.crb || '';
      this.driverData.driverLicenceExpiry = this.driverData.driverLicenceExpiry || 0;
      this.driverData.aliasName = this.driverData.aliasName || '';
      this.driverData.cabId = this.driverData.cabId || 0;
      this.driverData.agreement = this.driverData.agreement || '';
      this.driverData.licencePaper = this.driverData.licencePaper || '';
      this.driverData.licencePhoto = this.driverData.licencePhoto || '';
      this.driverData.pcoLicence = this.driverData.pcoLicence || '';
      this.driverData.insurance = this.driverData.insurance || '';
      this.driverData.delivery = this.driverData.delivery || '';
      this.driverData.female = this.driverData.female || '';
      this.driverData.luggage = this.driverData.luggage || '';
      this.driverData.nhs = this.driverData.nhs || '';
      this.driverData.driverLicenceNumber = this.driverData.driverLicenceNumber || '';
  }

  ngOnInit() {
    this.spinnerService.show();
    // this.setDefault();
    // this.queue = this.uploader.queue;
    this.userId = this.baseApiService.getUserId();
    const apiToken = this.baseApiService.getApiToken();
    let stateData = this.driverService.loadState(this.userId, apiToken).subscribe(response => {
      if (response) {
        this.statesList = response;
      }
    });
    let countryData = this.driverService.loadCountry(this.userId, apiToken).subscribe(response => {
      if (response) {
        this.countryList = response;
      }
    });
    let cityData = this.driverService.loadCity(this.userId, apiToken).subscribe(response => {
      if (response) {
        this.cityList = response;
      }
    });
    // this.driverService.getCabList(this.userId, apiToken).subscribe(res => {
    //   if (res) {
    //     this.cabList = res;
    //   }
    // });

    if (this.route.routeConfig.path === 'driver/editDriver/:driverId') {
      this.route && this.route.params.subscribe((params) => {
        this.driverId = params['driverId'];
        if(this.driverId) {
          this.getDriverDetails(this.driverId);
          this.spinnerService.hide();
        }
      });
    } else {
      this.driverId = '';
      this.spinnerService.hide();
    }
    
  }

}
