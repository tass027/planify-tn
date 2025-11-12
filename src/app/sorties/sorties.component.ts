import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sorties',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sorties.component.html',
  styleUrls: ['./sorties.component.css']
})
export class SortiesComponent {
  filterBudget: number | null = null;
  filterSex: string = '';
  filterPeople: number | null = null;
  filterType: string = '';

sorties = [
  {
    title: 'Coco Beach – Bizerte, Tunisie',
    budget: 120,
    sex: 'mixed',
    people: 4,
    type: 'adventure',
    image: 'assets/cocobeach.jpg',
    description: 'Fun at the beach with friends.',
    fullDescription: `
Coco Beach à Bizerte est l’endroit idéal pour profiter du soleil et de la mer dans un cadre paisible et chaleureux. L’entrée varie généralement entre 60 et 120 DT par personne, selon le type de cabane ou de service choisi.

Tarifs et services inclus:

La Casa Coco Beach :
Cabane pieds dans l’eau : 90 DT/pers
Cabane sur sable : 75 DT/pers
Enfant : 50 DT

Sidi Bou Coco Beach :
Terrasse : 55 DT
Cabane sur sable : 60 DT
Cabane pieds dans l’eau : 70 DT
Cabane VIP pieds dans l’eau : 75 DT
Enfant : 40 DT

Services inclus :
Accès à la plage privée, Transfert aller-retour en bateau,
Déjeuner complet au choix, Parking privé et sécurisé,
Transats, hamacs et poufs, Douches et vestiaires

Horaires :
Tous les jours de 7h00 à 19h00

Coco Beach est parfait pour se détendre, profiter des sports nautiques ou admirer des couchers de soleil spectaculaires. Que ce soit en famille, entre amis ou en solo, cette plage offre une expérience inoubliable.
    `
  },
  {
    title: 'Romantic Dinner Olivia Restaurante',
    budget: 120,
    sex: 'couple',
    people: 2,
    type: 'romantic',
    image: 'assets/oliviagamarth.jpg',
    description: 'Candlelight dinner for two, featuring gourmet dishes and a cozy ambiance.',
    fullDescription: `
🥂 Ambiance et cadre

Le restaurant propose une atmosphère élégante et raffinée, avec une décoration soignée et une ambiance musicale agréable. Il est classé parmi les meilleurs restaurants de Gammarth, offrant une expérience culinaire mémorable.

🍽️ Cuisine et service

La cuisine est méditerranéenne, avec une large sélection de plats, y compris des viandes, des poissons et des desserts créatifs. Les clients apprécient la qualité des plats, bien que certains estiment que le service pourrait être amélioré.

💰 Tarifs

Les prix varient en fonction des plats choisis, mais en général, le restaurant est considéré comme offrant un bon rapport qualité-prix.

📍 Localisation

Situé à Gammarth, le restaurant bénéficie d'un emplacement privilégié, à proximité de la mer, offrant ainsi une vue agréable pendant le repas.

📞 Réservation

Pour réserver une table, vous pouvez utiliser le service de réservation en ligne disponible sur majordome.tn.
    `
  },
  {
    title: 'Classy Party',
    budget: 100,
    sex: 'mixed',
    people: 10,
    type: 'classy',
    image: 'assets/party.jpg',
    description: 'Elegant evening with friends. Dress code: chic, music, cocktails, and dancing.',
    fullDescription: `
🎶 Ambiance et programmation

Le club propose une atmosphère électrique avec des lumières colorées et une piste de danse spacieuse. Des événements thématiques, tels que des soirées Disco Arabi avec danseurs et décorations spéciales, sont régulièrement organisés. Les soirées commencent généralement à 21h00 et se prolongent jusqu’à 4h00 du matin.

🍽️ Cuisine et service

Le menu du Zebra Club propose une variété de plats tels que des salades, des ramen, des sandwichs et des tapas, ainsi qu'une sélection de boissons incluant vodka et absinthe. Cependant, certains avis mentionnent des attentes prolongées pour le service et des erreurs sur les factures.

💰 Tarifs

Les prix varient selon les événements et les consommations. Par exemple, des soirées caritatives ont proposé des billets à partir de 30 DT. Il est recommandé de vérifier les tarifs spécifiques pour chaque événement sur leur page Facebook ou via des plateformes de billetterie en ligne.

📍 Informations pratiques

Adresse : W7CQ+8RX, Route Express De, Gammarth, Tunisie

Horaires : Ouvert tous les jours de 10h00 à 4h00

Contact : +216 53 650 650
    `
  },
  {
    title: 'Nature Hike Kaizen',
    budget: 40,
    sex: 'mixed',
    people: 5,
    type: 'adventure',
    image: 'assets/kaizen.jpg',
    description: 'Enjoy the great outdoors with a guided nature hike and picnic spots.',
    fullDescription: `
Le Kaizen Café est un restaurant-café situé à Sidi Thabet, dans le gouvernorat de l’Ariana, offrant une ambiance calme et chaleureuse, idéale pour un repas en famille ou entre amis.

🍽️ Cuisine & Ambiance

Le menu propose une variété de plats, notamment des petits-déjeuners copieux, des salades, des sandwichs et des plats principaux. Les prix des plats principaux varient généralement entre 15 et 25 TND. Les clients apprécient la qualité des repas et l'atmosphère sereine du lieu, avec un espace extérieur offrant une vue agréable sur les environs. Le design intérieur est minimaliste et élégant, avec des accents en bois et une lumière naturelle créant une ambiance chaleureuse et accueillante.

📍 Informations Pratiques

Adresse : Le Kaizen, Sidi Thabet, Ariana, Tunisie

Téléphone : +216 98 443 525

Horaires : Ouvert tous les jours de 7h00 à 00h00
    `
  }
];



  get filteredSorties() {
    return this.sorties.filter(s => {
      return (!this.filterBudget || s.budget <= this.filterBudget)
        && (!this.filterSex || s.sex === this.filterSex)
        && (!this.filterPeople || s.people === this.filterPeople)
        && (!this.filterType || s.type === this.filterType);
    });
  }

  resetFilters() {
    this.filterBudget = null;
    this.filterSex = '';
    this.filterPeople = null;
    this.filterType = '';
  }
    showMore: { [key: string]: boolean } = {};

    toggleShowMore(title: string) {
      this.showMore[title] = !this.showMore[title];
    }

}
