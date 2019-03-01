import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ShoppingCartService } from "app/restaurants-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurants-detail/shopping-cart/cart-item.model";
import { Order } from "./order.model";
import { Observable } from "rxjs";
import { MEAT_API } from "app/app.api";
import { LoginService } from "app/security/login/login.service";

@Injectable()
export class OrderService {

    constructor(
        private http: HttpClient,
        private cartService: ShoppingCartService,
        private loginService: LoginService
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
        let headers = new HttpHeaders();
        if(this.loginService.isLoggedIn()){
            headers = headers.set("Authorization", `Bearer ${this.loginService.user.accessToken}`)
        }
        return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers: headers})
                .map(order => order.id)
    }

    public clear() {
        this.cartService.clear();
    }
}