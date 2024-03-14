import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit {
  private totalSubscription: Subscription | undefined;
  total: number = 0
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.totalSubscription = this.cartService.cartTotal$.subscribe(
      (value: number) => {
        this.total = value;
      }
    )
  }
}
