import { Restaurant } from "./restaurant/restaurant.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { MEAT_API } from "../app.api"
import { ErrorHandler } from "../app.error-handler"
import { MenuItem } from "app/restaurants-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantService {
    constructor(private http: HttpClient){}

    public listRestaurants(search?: string): Observable<Restaurant[]> {
        let params: HttpParams = undefined;
        if(search){
            params = new HttpParams().append('q', search);
        }
        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})
    }

    public getRestaurantById(id: string): Observable<Restaurant> {
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
    }

    public reviewsOfRestaurant(id: string): Observable<any> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
    }

    public menuOfRestaurant(id: string): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
        
    }
}