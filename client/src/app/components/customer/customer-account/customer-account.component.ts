import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.css'],
})
export class CustomerAccountComponent implements OnInit {
  constructor(public _AuthService: AuthService, public _Router: Router) {}

  ngOnInit(): void {
    this._AuthService.decode();
  }
}
