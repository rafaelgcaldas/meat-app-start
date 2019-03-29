import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations'
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  preserveWhitespaces: true,
  animations: [
    trigger('row', [
      state("ready", style({ opacity: 1 })),
      transition("void => ready", animate("300ms 0s ease-in", keyframes([
        style({ opacity: 0, transform: "translateX(-30px)", offset: 0 }),
        style({ opacity: 0.8, transform: "translateX(10px)", offset: 0.8 }),
        style({ opacity: 1, transform: "translateX(0px)", offset: 1 })
      ]))),
      transition("ready => void", animate("300ms 0s ease-out", keyframes([
        style({ opacity: 1, transform: "translateX(0px)", offset: 0 }),
        style({ opacity: 0.8, transform: "translateX(-10px)", offset: 0.2 }),
        style({ opacity: 0, transform: "translateX(30px)", offset: 1 })
      ])))
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  public rowState = "ready";

  constructor( private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  public items(): any {
    return this.shoppingCartService.items
  }

  public total(): number {
    return this.shoppingCartService.total()
  }

  public clear(): void {
    this.shoppingCartService.clear()
  }

  public remove(item: any): void {
    this.shoppingCartService.removeItem(item)
  }

  public addItem(item: any): void {
    this.shoppingCartService.addItem(item)
  }

}
