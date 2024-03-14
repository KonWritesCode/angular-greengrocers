import { Injectable } from '@angular/core';
import { CartItem, Item } from '../models/item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartTotalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartTotal$ = this.cartTotalSubject.asObservable();

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

    this.updateTotal()
  }

  updateTotal(): number {
    let totalSum: number = 0

    this.cartItemsSubject.getValue().forEach(cartItem => {
      totalSum += cartItem.quantity * cartItem.item.price;

    });
    this.cartTotalSubject.next(totalSum);
    return totalSum;
  }

  getCartItems(): CartItem[] {
    return [...this.cartItemsSubject.getValue()];
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
    
    this.updateTotal()
  }
}
