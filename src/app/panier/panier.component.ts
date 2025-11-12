import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Gift {
  name: string;
  category: string;
  image: string;
  price: string;
  tags: string[];
  description?: string;
}

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  cart: Gift[] = [];

  constructor() {
    this.loadCart();
  }

  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('planifyCart') || '[]');
  }

  removeItem(index: number) {
    this.cart.splice(index, 1);
    localStorage.setItem('planifyCart', JSON.stringify(this.cart));
  }

  get total() {
    return this.cart.reduce((sum, item) => {
      const priceNum = Number(item.price.replace(' DT', ''));
      return sum + priceNum;
    }, 0);
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('planifyCart');
  }
}
