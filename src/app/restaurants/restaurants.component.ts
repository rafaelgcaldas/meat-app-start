import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'

import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurants.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger("toggleSearch",[
      state("hidden", style({
        opacity: 0,
        "max-height": "0px"
      })),
      state("visible", style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition("* => *", animate("250ms 0s ease-in-out"))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  public searchBarState: string = "hidden";
  public searchForm: FormGroup;
  public searchControl: FormControl;

  public restaurants: Restaurant[]

  constructor(
    private restaurantsService: RestaurantService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.searchControl = this.fb.control("");

    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(searchTerm => this.restaurantsService.listRestaurants(searchTerm)
      .catch(error => Observable.from([])))
      .subscribe(restaurants => this.restaurants = restaurants)

    this.listRestaurants()
  }

  public listRestaurants(): void {
    this.restaurantsService.listRestaurants()
      .subscribe((restaurants: Restaurant[]) => this.restaurants = restaurants)
  }

  public toggleSearch() {
    this.searchBarState = this.searchBarState === "hidden" ? "visible" : "hidden"; 
  }

}
