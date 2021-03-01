import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-register-failure",
  templateUrl: "./register-failure.component.html",
  styleUrls: ["./register-failure.component.scss"],
})
export class RegisterFailureComponent implements OnInit {
  @Output() returnPayment = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
