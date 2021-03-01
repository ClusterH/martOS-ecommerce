import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-cgu",
  templateUrl: "./cgu.component.html",
  styleUrls: ["./cgu.component.scss"],
})
export class CguComponent implements OnInit {
  cguAccepted = false;
  constructor( private router: Router,) {}

  ngOnInit() {}

  goToPlanList() {
    this.router.navigate(["/plan-list"]);
  }
}
