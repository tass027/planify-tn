import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Partenaire {
  nom: string;
  type: string;
  logo: string;
  url: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact = { nom: '', email: '', telephone: '', message: '' };
  fields: (keyof typeof this.contact)[] = ['nom','email','telephone','message'];

  partenaires: Partenaire[] = [
    { nom: 'Café 716', type: 'Café', logo: 'assets/partners/cafe.png', url: 'https://the716cafe.com/' },
    { nom: 'Restaurant Olive', type: 'Restaurant', logo: 'assets/partners/olivia.png', url: 'https://www.instagram.com/olivia_gammarth/?hl=en' },
    { nom: 'daisy beauty ', type: 'Maquillage', logo: 'assets/partners/makeup.jpg', url: 'https://www.instagram.com/daisy.beauty.tn/?hl=en' },
    { nom: 'Boutique Mode', type: 'Vêtements', logo: 'assets/partners/boutique.jpg', url: 'https://www.instagram.com/sisters_shopp_online/?hl=en' },
    { nom: 'Boutique diva', type: 'Vêtements', logo: 'assets/partners/diva.jpg', url: 'https://www.instagram.com/the_diva.shops/?hl=en' },
    { nom: 'Boutique flower', type: 'flowers', logo: 'assets/partners/flower.jpg', url: 'https://www.instagram.com/fleuriste_chahrazed_el_ward/?hl=en' },
    { nom: 'Pâtisserie takacim', type: 'Pâtisserie', logo: 'assets/partners/takacim.jpg', url: 'https://takacim.com.tn/101-patisseries-' }
  ];

  envoyerMessage() {
    if (!this.contact.nom || !this.contact.email || !this.contact.message) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    alert(`Merci ${this.contact.nom}, votre message a été envoyé avec succès !`);
    this.contact = { nom: '', email: '', telephone: '', message: '' };
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const elements = document.querySelectorAll('.fade-up');
    const triggerBottom = window.innerHeight * 0.85;
    elements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) el.classList.add('visible');
    });
  }

  tilt(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    if (!card) return;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = event.clientX - left - width/2;
    const y = event.clientY - top - height/2;
    card.style.transform = `rotateY(${x/20}deg) rotateX(${-y/20}deg) scale(1.05)`;
  }

  resetTilt(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    if (!card) return;
    card.style.transform = `rotateY(0) rotateX(0) scale(1)`;
  }
}
