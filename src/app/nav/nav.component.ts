import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/service/auth.service';
import { Router } from '@angular/router';
import { BaseApiService } from '../common/baseApi.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private userLoginSuccess = false;
  constructor(private authService: AuthService, private router: Router, private baseApiService: BaseApiService) {
    sessionStorage.getItem('authSuccess');
  }
  active = 'Activity Dashboard';
  isLogginSuccess: boolean;

  setActive(newActive) {
    this.active = newActive;
  }

  ngOnInit() {
    const userInfoJson = this.baseApiService.getUserInfo();
    if (userInfoJson) {
      this.userLoginSuccess = true;
    }
    this.isLogginSuccess = this.authService.getMockResponse();
  }

  logoutUser() {
    this.userLoginSuccess = false;
    sessionStorage.clear();
    this.authService.setMockResponse(false);
    this.router.navigate(['/login']);
    // this.authService.logoutUser().subscribe(response => {
    //   this.authService.setMockResponse(false);
    //   console.log('testing');
    //   this.router.navigate(['/login']);
    //   // get response
    // });
  }

  changePassword() {
    //
  }
}
