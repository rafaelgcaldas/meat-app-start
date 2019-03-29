import { Component, OnInit } from '@angular/core';

import{ FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurants-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  public orderForm: FormGroup;

  public delivery: number = 8;
  public orderId: string;

  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  public numberPattern = /^[0-9]*$/;

  public paymentOptions: RadioOption[] = [
    { label: "Dinheiro", value: "MON"},
    { label: "Cartão de Débito", value: "DEB"},
    { label: "Cartão Refeição", value: "REF"}
  ];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)],
        updateOn: "blur"
      }),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern) ]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, {validators: [OrderComponent.equalsTo], updateOn: "blur"});
  }

  public isOrderCompleted(): boolean {
    return this.orderId !== undefined;
  }

  public static equalsTo(group: AbstractControl): {[Key: string]: boolean} {
    const email = group.get("email");
    const emailConfirmation = group.get("emailConfirmation");

    if(!email || !emailConfirmation) {
      return undefined;
    }

    if(email.value !== emailConfirmation.value) {
      return {emailNotMatch: true};
    }

    return undefined;
  }

  public itemsValue(): number {
    return this.orderService.itemsValue();
  }

  public cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  public increaseQty(item: CartItem){
    this.orderService.increaseQty(item);
  }

  public decreaseQty(item: CartItem){
    this.orderService.decreaseQty(item);
  }

  public remove(item: CartItem){
    this.orderService.remove(item); 
  }

  public checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    
    this.orderService.checkOrder(order)
      .pipe(tap((orderId: string) => this.orderId = orderId))
      .subscribe((orderId: string) => {
        this.router.navigate(["/order-summary"]);
        this.orderService.clear();
      })
  }
}
