import { Injectable } from '@angular/core';

export interface Reservation {
  id: number;
  titre: string;
  date: string;
  participants: number;
  nom: string;
  email: string;
  telephone : string;
  adresse : string;
  statut: 'Réservé' | 'Payé' | 'Annulé' | 'En attente';
}


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations: Reservation[] = [];

  addReservation(reservation: Reservation) {
    reservation.statut = 'Réservé';
    this.reservations.push(reservation);
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  cancelReservation(index: number) {
    if(this.reservations[index]) this.reservations[index].statut = 'Annulé';
  }

  payReservation(index: number) {
    if(this.reservations[index]) this.reservations[index].statut = 'Payé';
  }

  removeReservation(index: number) {
    this.reservations.splice(index, 1);
  }
}
