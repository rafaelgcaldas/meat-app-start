import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'app/restaurants-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order-itens',
  templateUrl: './order-itens.component.html'
})
export class OrderItensComponent implements OnInit {

  @Input() public items: CartItem;

  @Output() public increaseQty = new EventEmitter<CartItem>();
  @Output() public decreaseQty = new EventEmitter<CartItem>();
  @Output() public remove = new EventEmitter<CartItem>();

  constructor() { }

  ngOnInit() {
  }

  public emitIncreaseQty(item: CartItem){
    this.increaseQty.emit(item);
  }

  public emitDecreaseQty(item: CartItem){
    this.decreaseQty.emit(item);
  }

  public emitRemove(item: CartItem){
    this.remove.emit(item);
  }

}
