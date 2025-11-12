import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; // for routerLink, router-outlet
import { CommonModule } from '@angular/common';  // for *ngIf, *ngFor
import { LoginComponent } from './login/login.component'; // your login component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  isMenuOpen: boolean = false;
  showLoginModal: boolean = false;
  cartCount: number = 0;
  bookingCount: number = 0;

    ngOnInit() {
      this.updateCartCount();
      this.updateBookingCount();
      window.addEventListener('storage', () => {
        this.updateCartCount();
        this.updateBookingCount();
      });
    }

    updateBookingCount() {
      const bookings = JSON.parse(localStorage.getItem('planifyBookings') || '[]');
      this.bookingCount = bookings.length;
    }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }



  updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('planifyCart') || '[]');
    this.cartCount = cart.length;
  }
}
