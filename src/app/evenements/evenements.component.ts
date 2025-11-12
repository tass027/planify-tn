import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationService, Reservation } from '../services/reservation.service';

interface Evenement {
  id: number;
  titre: string;
  date: string;
  lieu: string;
  description: string;
  age: string[];
  type: string[];
  images: string[];
  showFullDesc?: boolean;
  currentImage?: number; // facultatif, car on force 0 au départ
}

@Component({
  selector: 'app-evenements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.css']
})
export class EvenementsComponent {
  constructor(private reservationService: ReservationService) {}

  evenements: Evenement[] = [
    {
      id:1,
      titre:'Concert Jazz',
      date:'2025-09-05',
      lieu:'Cité de la Culture',
      description: `Venez vibrer au rythme du jazz avec des musiciens tunisiens et internationaux lors de cette soirée exceptionnelle.
L’événement fait partie du Jazz’it Festival, organisé par le label tunisien Jazz’it Records, pionnier du jazz en Tunisie.
Des concerts seront dirigés par des artistes tels que le saxophoniste belge Pietro Vaiana, le pianiste tuniso-suisse Moncef Genoud, le saxophoniste canadien Seamus Blake, le pianiste américain installé en Tunisie Kyle Schafer, le batteur franco-tunisien Mourad Ben Hammou et le guitariste américain Mark Whitfield.`,
      age:['Adulte'],
      type:['Couple','Friends','Musique'],
      images:['assets/jaz.jpg','assets/jaz2.jpg','assets/jaz3.jpg'],
      showFullDesc: false
    },
    {
      id:2,
      titre:'Atelier Peinture',
      date:'2025-09-12',
      lieu:'Musée National',
      description: `Participez à un atelier créatif pour toute la famille, animé par des artistes professionnels.
Le MACAM est un musée d’art moderne et contemporain ouvert en 2022 à la Cité de la Culture à Tunis.
Il abrite des œuvres de divers courants artistiques et offre un espace dédié aux enfants, le MACAM Kids, permettant aux plus jeunes de découvrir l'art de manière ludique et interactive.`,
      age:['Enfant','Adulte'],
      type:['Famille','Art','Atelier'],
      images:['assets/paint.jpg','assets/paint1.jpg','assets/paint2.jpg'],
      showFullDesc: false
    },
    {
      id:3,
      titre:'Conférence Tech',
      date:'2025-09-20',
      lieu:'Centre Conférences',
      description: `Assistez à une conférence de haut niveau sur l’intelligence artificielle et la cybersécurité, avec des intervenants experts.
Cet événement s’inscrit dans le cadre des International Conferences on Artificial Intelligence organisées à Tunis.`,
      age:['Adulte','Senior'],
      type:['Friends','Couple','Conférence','Tech'],
      images:['assets/tech.jpg','assets/tech2.jpg','assets/tech4.jpg'],
      showFullDesc: false
    },
    {
      id:4,
      titre:'Festival Cinéma',
      date:'2025-10-01',
      lieu:'CinéMarsa',
      description: `Participez à un festival international de cinéma, avec des projections de films, des ateliers et des discussions avec les réalisateurs.
CinéMarsa est un lieu incontournable pour les amateurs de cinéma en Tunisie.`,
      age:['Adulte','Senior'],
      type:['Couple','Friends','Festival','Cinéma'],
      images:['assets/cinema2.jpg','assets/cinema1.jpg','assets/cinema3.jpg'],
      showFullDesc: false
    },
    {
      id:5,
      titre:'Yoga en plein air',
      date:'2025-09-18',
      lieu:'Parc du Belvédère',
      description: `Rejoignez une séance de yoga matinale en plein air, ouverte à tous les niveaux.
Le Parc du Belvédère est l’un des meilleurs endroits pour pratiquer le yoga en plein air en Tunisie.`,
      age:['Adulte','Senior'],
      type:['Famille','Friends','Sport','Bien-être'],
      images:['assets/yoga1.jpg','assets/yoga2.jpg'],
      showFullDesc: false
    },
    {
      id:6,
      titre:'Atelier Cuisine Tunisienne',
      date:'2025-09-25',
      lieu:'Maison de la Culture',
      description: `Apprenez à cuisiner des plats traditionnels tunisiens avec un chef expérimenté.
Cet atelier convivial et gourmand vous permettra de découvrir les secrets de la gastronomie tunisienne.`,
      age:['Adulte'],
      type:['Couple','Friends','Cuisine','Gastronomie','Atelier'],
      images:['assets/cuisine1.jpg','assets/cuisine2.jpg'],
      showFullDesc: false
    },
    {
      id:7,
      titre:'Spectacle de Danse',
      date:'2025-10-05',
      lieu:'Théâtre Municipal',
      description: `Assistez à un spectacle de danse contemporaine et traditionnelle, une performance visuelle et émotionnelle.
Cet événement s’inscrit dans le cadre de la Journée Internationale de la Danse, célébrée chaque année.`,
      age:['Enfant','Adulte'],
      type:['Famille','Friends','Théâtre','Danse'],
      images:['assets/danse1.jpg','assets/danse2.jpg'],
      showFullDesc: false
    },
    {
      id:8,
      titre:'Randonnée Nature',
      date:'2025-09-28',
      lieu:'Parc National de Boukornine',
      description: `Randonnée guidée à travers la nature tunisienne.
Idéal pour les amateurs de plein air et familles.`,
      age:['Enfant','Adulte','Senior'],
      type:['Famille','Friends','Sport','Nature'],
      images:['assets/rando1.jpg','assets/rando2.jpg'],
      showFullDesc: false
    },
    {
      id:9,
      titre:'Atelier Photographie',
      date:'2025-10-10',
      lieu:'Galerie d’Art Tunis',
      description: `Participez à un atelier pour apprendre les bases de la photographie et des techniques avancées, animé par un photographe professionnel.
La galerie offre un cadre idéal pour les amateurs d’art et de photographie.`,
      age:['Adulte','Senior'],
      type:['Friends','Art','Atelier','Photographie'],
      images:['assets/photo1.jpg','assets/photo2.jpg'],
      showFullDesc: false
    },
    {
      id:10,
      titre:'Soirée Karaoké',
      date:'2025-10-20',
      lieu:'Bar Musical Tunis',
      description: `Venez chanter vos chansons préférées et passer une soirée conviviale entre amis ou en couple.
Micro et bonne humeur garantis !`,
      age:['Adulte','Senior'],
      type:['Friends','Couple','Musique','Soirée'],
      images:['assets/karaoke1.jpg','assets/karaoke2.jpg'],
      showFullDesc: false
    }
  ];

  filterAge = '';
  filterType = '';
  filterDate = '';

  reservationEvent: Evenement | null = null;
  reservation = { nom:'', email:'', telephone:'', adresse:'', participants:1 };

  ngOnInit() {
    this.evenements.forEach(evt => evt.currentImage = 0);
    this.startAutoCarousel();
  }

  // CAROUSEL AUTOMATIQUE
  startAutoCarousel() {
    setInterval(() => {
      this.evenements.forEach(evt => {
        evt.currentImage = (evt.currentImage! + 1) % evt.images.length;
      });
    }, 4000);
  }

  selectImage(evt: Evenement, index: number) { evt.currentImage = index; }
  nextImage(evt: Evenement) { evt.currentImage = (evt.currentImage! + 1) % evt.images.length; }
  prevImage(evt: Evenement) { evt.currentImage = (evt.currentImage! - 1 + evt.images.length) % evt.images.length; }

  openReservation(evt: Evenement) {
    this.reservationEvent = evt;
    this.reservation = { nom:'', email:'', telephone:'', adresse:'', participants:1 };
  }

  confirmerReservation() {
    if (!this.reservation.nom || !this.reservation.email || !this.reservation.participants) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    const newRes: Reservation = {
      id: Date.now(),
      titre: this.reservationEvent!.titre,
      date: this.reservationEvent!.date,
      nom: this.reservation.nom,
      email: this.reservation.email,
      telephone: this.reservation.telephone,
      adresse: this.reservation.adresse,
      participants: this.reservation.participants,
      statut: 'Réservé'
    };

    this.reservationService.addReservation(newRes);
    alert(`Réservation confirmée pour ${this.reservation.participants} participant(s) à "${this.reservationEvent!.titre}" !`);
    this.reservationEvent = null;
  }

  get filteredEvenements() {
    return this.evenements.filter(e =>
      (!this.filterAge || e.age.includes(this.filterAge)) &&
      (!this.filterType || e.type.includes(this.filterType)) &&
      (!this.filterDate || e.date === this.filterDate)
    );
  }

  toggleDescription(evt: Evenement) { evt.showFullDesc = !evt.showFullDesc; }
}
