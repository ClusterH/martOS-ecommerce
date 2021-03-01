import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/authentication/auth.service';

@Component({
  selector: 'app-leading-header',
  templateUrl: './leading-header.component.html',
  styleUrls: ['./leading-header.component.scss']
})
export class LeadingHeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(){
    this.authService.login();
  }

}
