import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart-service';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ fixed
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],

})
export class CheckoutComponent implements OnInit {
  items: any[] = [];
  total = 0;

  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit() {
    this.cartService.getCart().subscribe(data => {
      this.items = data;
      this.total = this.cartService.getTotal();
    });
  }

  increaseQty(index: number) {
    this.cartService.updateQuantity(index, 1);
    this.total = this.cartService.getTotal();
  }

  decreaseQty(index: number) {
    this.cartService.updateQuantity(index, -1);
    this.total = this.cartService.getTotal();
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
    this.total = this.cartService.getTotal();
  }

  payNow() {
    if (this.items.length === 0) {
      alert('Cart is empty!');
      return;
    }

    this.http.post<{ id: string }>('http://localhost:8000/api/create-checkout-session/', {
      items: this.items
    }).subscribe({
      next: res => window.location.href = `https://checkout.stripe.com/pay/${res.id}`,
      error: err => alert('Something went wrong. Try again.')
    });
  }
}
