import { Component, OnInit } from '@angular/core';
import { ShoppingService } from './shared/shopping/shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Shopping-Online';
  constructor(public _ShoppingService: ShoppingService) {}

  ngOnInit(): void {}
}
