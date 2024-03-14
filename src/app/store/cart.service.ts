import { Injectable } from '@angular/core';
import { CartItem, Item } from '../models/item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() { }

  addToCart(item: Item, quantity: number = 1): void {
    const currentCartItems = this.cartItemsSubject.getValue();
    console.log(currentCartItems)

    const itemIndex = currentCartItems.findIndex(cartItem => cartItem.item.id === item.id);
    if(item.id === "") 
      return;

    if (itemIndex !== -1) {
      currentCartItems[itemIndex].quantity += quantity;
      this.cartItemsSubject.next([...currentCartItems]);
    } else {
      this.cartItemsSubject.next([...currentCartItems, {item: item, quantity: 1}]);
    }
  }

  getCartItems(): CartItem[] {
    let items: CartItem[] = [];
    this.cartItemsSubject.getValue().forEach(item => {
      items.push(item)
    });
    console.log(items)

    return items;
  }

  removeItemFromCart(id: string, quantity: number = 1): void {
    const currentCartItems = this.cartItemsSubject.getValue();

    const itemIndex = currentCartItems.findIndex(cartItem => cartItem.item.id === id);

    if (currentCartItems[itemIndex].quantity - quantity > 0) {
      currentCartItems[itemIndex].quantity -= quantity;
      this.cartItemsSubject.next([...currentCartItems]);
    } else {
      currentCartItems.splice(itemIndex, 1);
      this.cartItemsSubject.next([...currentCartItems]);
    }
  }
}
