import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-order-sumary',
  templateUrl: './order-sumary.component.html'
})
export class OrderSumaryComponent implements OnInit {

  public rated: boolean;

  constructor() { }

  ngOnInit() {
  }

  public rate() {
    this.rated = true;
  }

}
