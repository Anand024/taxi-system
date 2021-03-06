import { Component, OnInit, ViewChild } from '@angular/core';
import {IMyDpOptions} from 'angular4-datepicker/src/my-date-picker';
import { FileUploadService } from '../../common/service/file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  @ViewChild('loginDetails') loginDetails: NgForm;
  @ViewChild('licencing') licencing: NgForm;
  // private licencing: FormGroup;
  @ViewChild('fileInput') fileInput;

  private formInvalid: boolean;
  private isLoginValid = false;
  private isPersonalDetailsValid = false;
  private isLicencingValid = false;

  selectedFiles: FileList;
  currentFileUpload: File;
  userId: string;
  isProofOfAddressSelected = false;
  // queue: Observable<FileQueueObject[]>;
  driverId: string;
  driverData: AddDriverDataModel;
  statesList: any[] = [];
  countryList: any[] = [];
  cityList: any[] = [];
  cabList: any[] = [];
  selectedFile: {
    'photo': '',
    'agreement': ''
  };

  constructor(private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService, private router: Router,
    private baseApiService: BaseApiService, private driverService: DriverService, public uploader: FileUploadService,
    private formBuilder: FormBuilder) {
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
    if (this.validateForm()) {
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
            this.setDriverData(res);
            this.driverData = res;
          }
          console.log('update success');
        });
      }
      this.router.navigate([`/driver`]);
    }
  }

  setDriverData = (res) => {
    this.driverData.agreement = res.agreement || '';
    this.driverData.insurance = res.insurance || '';
    this.driverData.licencePaper = res.licencePaper || '';
    this.driverData.licencePhoto = res.licencePhoto || '';
    this.driverData.pcoLicence = res.pcoLicence || '';
    this.driverData.photo = res.photo || '';
    this.driverData.policeDisclose = res.policeDisclose || '';
    this.driverData.proofOfAddress = res.proofOfAddress || '';
}

  validateError(event) {
    // for proofOfAddress error handling
    const fileName = event.target.name;
    if (fileName === 'proofOfAddress' && event.target.files.length === 0) {
      this.isProofOfAddressSelected = true;
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
    } else {
      if (name === 'proofOfAddress') {
        this.isProofOfAddressSelected = true;
      }
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

  validateForm() {
    if (this.loginDetails.valid && this.personalDetails.valid && this.licencing.valid) {
      this.formInvalid = false;
      return true;
    } else {
      return false;
    }
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
        this.setDate(this.driverData.startDate, this.driverData.driverLicenceExpiry);
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

  setDate(startDate, expiryDate): void {
    const sDate = new Date(startDate);
    const eDate = new Date(expiryDate);
    this.driverData.startDate = {date: {year: sDate.getFullYear(), month: sDate.getMonth() + 1 , day: sDate.getDate()}};
    this.driverData.driverLicenceExpiry = {date: {year: eDate.getFullYear(), month: eDate.getMonth() + 1 , day: eDate.getDate()}};

}
  ngOnInit() {
    this.spinnerService.show();

    this.userId = this.baseApiService.getUserId();
    const apiToken = this.baseApiService.getApiToken();
    this.driverService.loadState(this.userId, apiToken).subscribe(response => {
      if (response) {
        this.statesList = response;
      }
    });
    this.driverService.loadCountry(this.userId, apiToken).subscribe(response => {
      if (response) {
        this.countryList = response;
      }
    });
    this.driverService.loadCity(this.userId, apiToken).subscribe(response => {
      if (response) {
        this.cityList = response;
      }
    });
    this.driverService.loadCabData(this.userId, apiToken).subscribe(res => {
      if (res) {
        this.cabList = res;
      }
    });

    if (this.route.routeConfig.path === 'driver/editDriver/:driverId') {
      this.route && this.route.params.subscribe((params) => {
        this.driverId = params['driverId'];
        if(this.driverId) {
          this.getDriverDetails(this.driverId);
          this.spinnerService.hide();
        }
      });
    } else {
      this.formInvalid = true;
      this.driverId = '';
      this.spinnerService.hide();
    }
  }

}
