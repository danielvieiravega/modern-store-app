import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit {
  public items: any[] = [];
  public discount: number = 0;
  public deliveryFee: number = 5;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.items;
  }

  remove(item: any) {
    this.cartService.removeItem(item.id);
  }

  getSubTotal(): number {
    return this.cartService.getSubTotal();
  }


  checkQuantity(item) {
    if (item.quantity < 1) {
      item.quantity = 1;
    }
  }
}
