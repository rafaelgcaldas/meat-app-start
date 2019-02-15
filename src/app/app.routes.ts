import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { RestaurantsDetailComponent } from "./restaurants-detail/restaurants-detail.component";
import { MenuComponent } from "./restaurants-detail/menu/menu.component";
import { ReviewsComponent } from "./restaurants-detail/reviews/reviews.component";
import { OrderSumaryComponent } from "./order-sumary/order-sumary.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const ROUTES: Routes = [
    { path: "", component: HomeComponent },
    { path: "restaurants", component: RestaurantsComponent },
    { path: "restaurants/:id", component: RestaurantsDetailComponent,
        children:[
            { path: "", redirectTo: "menu", pathMatch: "full" },
            { path: "menu", component: MenuComponent },
            { path: "reviews", component: ReviewsComponent }
        ]
    },
    { path: "order-summary", component: OrderSumaryComponent},
    { path: "order", loadChildren: './order/order.module#OrderModule' },
    { path: "about", loadChildren: './about/about.module#AboutModule' },
    { path: "**", component: NotFoundComponent }
]