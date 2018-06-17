import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/service/auth.service';
import { BaseApiService } from '../../common/baseApi.service';

@Component({
  selector: 'app-header-link',
  templateUrl: './header-link.component.html',
  styleUrls: ['./header-link.component.css']
})
export class HeaderLinkComponent implements OnInit {

  private userLoginSuccess = false;
  headerLinks: any[] = [
    { name: 'Cabs Online'},
    { name: 'Available Cabs'},
    { name: 'Number of Trips'},
    { name: 'Number of Delivery'}
  ];
  constructor(private authService: AuthService, private baseApiService: BaseApiService) { }

  ngOnInit() {
    const userInfoJson = this.baseApiService.getUserInfo();
    if (userInfoJson) {
      this.userLoginSuccess = true;
    }
  }

}
