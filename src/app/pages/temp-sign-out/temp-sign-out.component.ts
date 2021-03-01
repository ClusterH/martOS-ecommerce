import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-temp-sign-out',
  templateUrl: './temp-sign-out.component.html',
  styleUrls: ['./temp-sign-out.component.scss']
})
export class TempSignOutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.signout();
  }

}
