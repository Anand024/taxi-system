import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NavComponent } from './nav/nav.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DriverComponent } from './driver/driver.component';
import { FooterComponent } from './footer/footer.component';
import { ActivityDashboardComponent } from './auth/activity-dashboard/activity-dashboard.component';
import { LoggingService } from './common/service/loggin.service';
import { AuthService } from './common/service/auth.service';
import { HeaderLinkComponent } from './nav/header-link/header-link.component';
import { AddDriverComponent } from './driver/add-driver/add-driver.component';
import { MyDatePickerModule } from 'mydatepicker';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { DriverService } from './common/driver.service';
import { FileUploadService } from './common/service/file-upload.service';
import { ChangePasswordComponent } from './nav/change-password/change-password.component';
import { BaseApiService } from './common/baseApi.service';
import { DeleteModalComponent } from './common/delete/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NavComponent,
    ResetPasswordComponent,
    DriverComponent,
    FooterComponent,
    ActivityDashboardComponent,
    HeaderLinkComponent,
    AddDriverComponent,
    ChangePasswordComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    MyDatePickerModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [AuthService, DriverService, FileUploadService, BaseApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
