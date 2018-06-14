import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/service/auth.service';

@Component({
  selector: 'app-header-link',
  templateUrl: './header-link.component.html',
  styleUrls: ['./header-link.component.css']
})
export class HeaderLinkComponent implements OnInit {

  headerLinks: any[] = [
    { name: 'Cabs Online'},
    { name: 'Available Cabs'},
    { name: 'Number of Trips'},
    { name: 'Number of Delivery'}
  ];
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
