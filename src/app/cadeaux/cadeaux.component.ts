import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Gift {
  name: string;
  category: string;
  image: string;
  price: string;
  tags: string[];
  description?: string;
  prixNumber?: number;
}

@Component({
  selector: 'app-cadeaux',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadeaux.component.html',
  styleUrls: ['./cadeaux.component.css']
})
export class CadeauxComponent {
  selectedSexe: string = '';
  selectedOccasion: string = '';
  selectedInteret: string = '';
  selectedBudget: number | null = null;

  modalOpen: boolean = false;
  selectedGift: Gift | null = null;

  gifts: Gift[] = [
    { name: 'Robe élégante', category: 'Mode', image: 'assets/robeelegante.jpg', price: '180 DT', tags: ['femme','mode','anniversaire'] },
    { name: 'Coffret Maquillage Essence', category: 'Beauté', image: 'assets/packessence.jpg', price: '95 DT', tags: ['femme','maquillage','marque','essence'] },
    { name: 'Rouge à lèvres Dior', category: 'Beauté', image: 'assets/rougedior.jpg', price: '210 DT', tags: ['femme','maquillage','marque','dior'] },
    { name: 'Coffret Skincare Kiko', category: 'Soins', image: 'assets/skincarekiko.jpg', price: '150 DT', tags: ['femme','skincare','marque','kiko'] },
    { name: 'Parfum Yara', category: 'Parfum', image: 'assets/yara.jpg', price: '230 DT', tags: ['femme','parfum','yara'] },
    { name: 'Parfum Azal', category: 'Parfum', image: 'assets/azal.jpg', price: '270 DT', tags: ['femme','parfum','azal'] },
    { name: 'Chocolat Pack', category: 'Gourmandise', image: 'assets/choco.jpg', price: '80 DT', tags: ['femme','chocolat','valentin'] },
    { name: 'Bouquet de Fleurs', category: 'Romantique', image: 'assets/fleurs.jpg', price: '65 DT', tags: ['femme','fleurs','amour'] },
    { name: 'Montre Classique', category: 'Accessoires', image: 'assets/montre.jpg', price: '250 DT', tags: ['homme','mode','anniversaire'] },
    { name: 'Pack Sport', category: 'Intérêt', image: 'assets/sport.jpg', price: '200 DT', tags: ['homme','sport'] },
    { name: 'Parfum Sauvage Dior', category: 'Parfum', image: 'assets/sauvage.jpg', price: '350 DT', tags: ['homme','parfum','dior'] },
    { name: 'Pack Beauty (Maquillage + Parfum Yara)', category: 'Pack', image: 'assets/packbeauty.jpg', price: '350 DT', tags: ['femme','pack','beauty'] },
    { name: 'Pack Love (Fleurs + Chocolat)', category: 'Pack', image: 'assets/packlove.jpg', price: '120 DT', tags: ['femme','pack','romantique'] },
    { name: 'Pack Best Seller (Montre + Parfum)', category: 'Pack', image: 'assets/packbest.jpg', price: '500 DT', tags: ['homme','pack','best'] }
  ];

  constructor() {
    // convert price string to number
    this.gifts.forEach(gift => gift.prixNumber = Number(gift.price.replace(' DT', '')));
  }

  get filteredGifts() {
    return this.gifts.filter(gift =>
      (!this.selectedSexe || gift.tags.includes(this.selectedSexe)) &&
      (!this.selectedOccasion || gift.tags.includes(this.selectedOccasion)) &&
      (!this.selectedInteret || gift.tags.includes(this.selectedInteret)) &&
      (!this.selectedBudget || (gift.prixNumber && gift.prixNumber <= this.selectedBudget))
    );
  }

  openModal(gift: Gift) {
    this.selectedGift = gift;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.selectedGift = null;
  }

  addToCart(gift: Gift) {
    let cart = JSON.parse(localStorage.getItem('planifyCart') || '[]');
    cart.push(gift);
    localStorage.setItem('planifyCart', JSON.stringify(cart));
    alert(`${gift.name} a été ajouté au panier !`);
  }
}
