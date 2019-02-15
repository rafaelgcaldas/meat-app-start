import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { ShoppingCartService } from "app/restaurants-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurants-detail/shopping-cart/cart-item.model";
import { Order } from "./order.model";
import { Observable } from "rxjs";
import { MEAT_API } from "app/app.api";
import { map } from 'rxjs/operators'

@Injectable()
export class OrderService {

    constructor(
        private http: Http,
        private cartService: ShoppingCartService
    ){}

    public cartItems(): CartItem[]{
        return this.cartService.items;
    }

    public increaseQty(item: CartItem){
        this.cartService.increaseQty(item);
    }

    public decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item);
    }

    public remove(item: CartItem) {
        this.cartService.removeItem(item);
    }

    public itemsValue(): number{
        return this.cartService.total();
    }
    
    public checkOrder(order: Order): Observable<string> {
        const headers = new Headers();
        headers.append("Content-Type", "Application/json");

        return this.http.post(`${MEAT_API}/orders`, JSON.stringify(order), new RequestOptions({headers: headers}))
            .pipe(
                map((resposta: Response) => resposta.json().id)
            )
    }

    public clear() {
        this.cartService.clear();
    }
}