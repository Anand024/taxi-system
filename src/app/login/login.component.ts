import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../common/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    @ViewChild('login') loginForm: NgForm;
    emailId: string;
    emailPassword: string;
    loginStatus: any;

    constructor (private router: Router, private authService: AuthService) {}
    onSubmit() {
        this.authService.checkLoginSuccess(this.emailId, this.emailPassword).subscribe(
            res => {
                this.loginStatus =  res;
                this.router.navigate(['/activityDashboard']);
            }
        );
    }
}
