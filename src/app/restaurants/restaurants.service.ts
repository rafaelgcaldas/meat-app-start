import { Restaurant } from "./restaurant/restaurant.model";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';

import { MEAT_API } from "../app.api"
import { ErrorHandler } from "../app.error-handler"
import { MenuItem } from "app/restaurants-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantService {
    constructor(private http: Http){}

    public listRestaurants(search?: string): Observable<Restaurant[]> {
        return this.http.get(`${MEAT_API}/restaurants`, {params: {q: search}})
        .pipe(
            map((resposta: Response) => resposta.json()),
            catchError(ErrorHandler.handleError)
        )
    }

    public getRestaurantById(id: string): Observable<Restaurant> {
        return this.http.get(`${MEAT_API}/restaurants/${id}`)
        .pipe(
            map((resposta: Response) => resposta.json()),
            catchError(ErrorHandler.handleError)
        )
    }

    public reviewsOfRestaurant(id: string): Observable<any> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
        .pipe(
            map((resposta: Response) => resposta.json()),
            catchError(ErrorHandler.handleError)
        )
    }

    public menuOfRestaurant(id: string): Observable<MenuItem[]> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
        .pipe(
            map((resposta: Response) => resposta.json()),
            catchError(ErrorHandler.handleError)
        )
    }
}