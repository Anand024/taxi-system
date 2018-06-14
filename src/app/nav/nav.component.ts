import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../common/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService, private detector: ChangeDetectorRef) { }
  active = 'Activity Dashboard';
  isLogginSuccess: boolean;

  setActive(newActive) {
    this.active = newActive;
  }

  ngOnInit() {
    this.isLogginSuccess = this.authService.getMockResponse();
    this.detector.detectChanges();
  }

}
