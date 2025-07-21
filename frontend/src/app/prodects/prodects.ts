import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food-service';
import { CartService } from '../services/cart-service';
import { Foods } from '../shared/models/food';
import { CommonModule } from '@angular/common';
import { Search } from '../search/search';

@Component({
  selector: 'app-prodects',
  standalone: true,
  imports: [CommonModule, Search],
  templateUrl: './prodects.html',
  styleUrls: ['./prodects.css']
})
export class Prodects implements OnInit {
  allFoods: Foods[] = [];
  filteredFoods: Foods[] = [];

  constructor(private fs: FoodService, private cartService: CartService) { }

  ngOnInit(): void {
    this.allFoods = this.fs.getAll();
    this.filteredFoods = [...this.allFoods];
  }

  onSearch(searchTerm: string) {
    const lowerSearch = searchTerm.toLowerCase();

    this.filteredFoods = this.allFoods.filter(food =>
      food.name.toLowerCase().includes(lowerSearch) ||
      (food.tags && food.tags.some(tag => tag.toLowerCase().includes(lowerSearch)))
    );
  }

  addToCart(product: Foods) {
    this.cartService.addToCart(product);
    alert(`${product.name} added to cart`);
  }
}
