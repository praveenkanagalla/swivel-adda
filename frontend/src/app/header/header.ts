import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../services/cart-service';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [CommonModule, RouterModule, Modal]
})
export class Header {
  menuVariable = false;
  dropdownOpen = false;
  showUserModal = false;
  cartCount = 0;
  userData: any = null; // ✅ Declare to hold user info

  constructor(
    private cartService: CartService,
    private elementRef: ElementRef,
    private router: Router
  ) { }

  ngOnInit() {
    // ✅ Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser && savedUser !== 'undefined') {
      try {
        this.userData = JSON.parse(savedUser);
      } catch (err) {
        console.error('Failed to parse user:', savedUser);
        this.userData = null;
      }
    }

    // ✅ Check if we should auto-show modal
    const showModal = localStorage.getItem('showModal');
    if (showModal === 'true') {
      this.showUserModal = true;
      localStorage.removeItem('showModal');
    }

    // ✅ Load cart count
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.reduce((count, item) => count + item.quantity, 0);
    });
  }

  openMenu() {
    this.menuVariable = true;
  }

  closeMenu() {
    this.menuVariable = false;
  }

  openModal() {
    this.showUserModal = true;
  }

  closeModal() {
    this.showUserModal = false;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target as Node);

    if (!clickedInside) {
      this.dropdownOpen = false;
      this.menuVariable = false;
      this.showUserModal = false;
    }
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.clear();
    // Redirect to login page
    this.closeModal();
    this.router.navigate(['/login']);
  }
}
