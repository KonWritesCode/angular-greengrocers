import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { TotalComponent } from './total/total.component';
import { ProductsModule } from '../products/products.module';


@NgModule({
  declarations: [
    CartComponent,
    TotalComponent
  ],
  imports: [
    CommonModule, ProductsModule
  ],
  exports: [
    CartComponent, TotalComponent
  ]
})
export class StoreModule { }
