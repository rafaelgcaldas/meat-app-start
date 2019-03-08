import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './order.component';
import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component';
import { OrderItensComponent } from './order-itens/order-itens.component';
import { SharedModule } from 'app/shared/shared.module';
import { LeaveOrderGuard } from './leave-order.guard';

const ROUTES: Routes = [
    { path: "", component: OrderComponent, canDeactivate: [LeaveOrderGuard]}
]

@NgModule({
    declarations: [
        OrderComponent,
        DeliveryCostsComponent,
        OrderItensComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ]
})

export class OrderModule {}