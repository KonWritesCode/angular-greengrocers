import { Component, inject  } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  productService = inject(ProductService);
  products: any;

  async ngOnInit() {
    this.products = await this.productService.products;
  }
}
