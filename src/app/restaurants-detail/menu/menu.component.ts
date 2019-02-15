import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'app/restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuItem } from '../menu-item/menu-item.model';


@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  public menu: Observable<MenuItem[]>

  constructor(
    private restauranteService: RestaurantService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.menu = this.restauranteService.menuOfRestaurant(this.route.parent.snapshot.params["id"])
  }
  
  public addMenuItem(item: MenuItem) {
    console.log(item)
  }

}
