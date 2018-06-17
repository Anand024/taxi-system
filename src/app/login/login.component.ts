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
    loginData = {
        email: '',
        opt: '',
        password: ''
    };

    constructor (private router: Router, private authService: AuthService) {}
    onSubmit() {
        this.authService.checkLoginSuccess(this.loginData).subscribe(
            res => {
                if (res) {
                    this.loginStatus =  res;
                    sessionStorage.setItem('userData', JSON.stringify(this.loginStatus));
                    this.router.navigate(['/activityDashboard']);
                } else {
                    // this.router.navigate(['/']);
                }
            }
        );
    }
}
