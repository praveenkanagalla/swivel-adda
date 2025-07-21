import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css'],  // ✅ Fixed from styleUrl
  imports: [RouterModule, CommonModule, FormsModule]
})
export class Header implements OnInit {
  menuVariable: boolean = false;
  cartCount = 0;
  clickedOutside = false;

  constructor(private cartService: CartService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.reduce((count, item) => count + item.quantity, 0);
    });
  }

  openMenu() {
    this.menuVariable = true;
    console.log("Open Menu...");
  }

  closeMenu() {
    this.menuVariable = false;
    console.log("Close Menu...");
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    this.clickedOutside = !clickedInside;

    if (!clickedInside && this.menuVariable) {
      this.closeMenu();
    }
  }

  dropdownOpen = false;

  @HostListener('window:click', ['$event'])
  onWindowClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropdownOpen = false;
    }
  }
}
