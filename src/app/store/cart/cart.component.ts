import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItem, Item } from 'src/app/models/item';
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartContent: CartItem[] = [];

  constructor(private cartService: CartService) { }

  addItemToCart(item: Item, quantity: number = 1) {
    this.cartService.addToCart(item, quantity)
  }
  removeItemFromCart(id: string) {
    this.cartService.removeItemFromCart(id)
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(
      (cartItems: CartItem[]) => {
        this.cartContent = cartItems;
      }
    );
  }
}
