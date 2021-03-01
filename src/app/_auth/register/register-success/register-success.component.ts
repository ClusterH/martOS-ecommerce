import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: "app-register-success",
  templateUrl: "./register-success.component.html",
  styleUrls: ["./register-success.component.scss"],
})
export class RegisterSuccessComponent implements OnInit {
  constructor(private router: Router,     
        private authService: AuthService,
    ) {}

  ngOnInit() {}

  login() {
    this.authService.login();
  }

  goToHome() {
    this.router.navigateByUrl('/');
  }
}
