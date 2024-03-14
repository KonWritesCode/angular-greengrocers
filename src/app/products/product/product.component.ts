import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../product.service';
import { CartItem, Item } from 'src/app/models/item';
import { CartService } from 'src/app/store/cart.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input('product') product: Item = {id: "", name: "", price: 0, type: ""};

  constructor(private cartService: CartService) { }

  // Function to emit addItem event
  handleAddItem(item: any): void {
    if(item === "")
      return;

    this.cartService.addToCart(item);
  }
}
