import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // this.authService.signout();
  }

  login(): void {
    this.authService.login();
  }

}
