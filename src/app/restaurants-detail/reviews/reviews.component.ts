import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'app/restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  public reviews: Observable<any>

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.reviewsOfRestaurant(this.route.parent.snapshot.params["id"])
  }

  public reviewsOfRestaurant(id: string): void {
    this.reviews = this.restaurantService.reviewsOfRestaurant(id)
  }

}
