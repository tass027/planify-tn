import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService, Reservation } from '../services/reservation.service';

interface CalendarDay {
  date: string;
  events: Reservation[];
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  calendar: CalendarDay[][] = [];
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.initCalendar();
    this.loadReservations();
  }

  initCalendar(): void {
    this.calendar = [
      [
        { date: '2025-09-01', events: [] },
        { date: '2025-09-02', events: [] },
        { date: '2025-09-03', events: [] },
        { date: '2025-09-04', events: [] },
        { date: '2025-09-05', events: [] },
        { date: '2025-09-06', events: [] },
        { date: '2025-09-07', events: [] },
      ],
      [
        { date: '2025-09-08', events: [] },
        { date: '2025-09-09', events: [] },
        { date: '2025-09-10', events: [] },
        { date: '2025-09-11', events: [] },
        { date: '2025-09-12', events: [] },
        { date: '2025-09-13', events: [] },
        { date: '2025-09-14', events: [] },
      ]
    ];
  }

  loadReservations(): void {
    // récupérer toutes les réservations du service
    this.reservations = this.reservationService.getReservations();

    // vider les events avant de recharger
    this.calendar.forEach(week =>
      week.forEach(day => day.events = [])
    );

    // placer chaque réservation dans le bon jour
    this.reservations.forEach(res => {
      this.calendar.forEach(week => {
        const day = week.find(d => d.date === res.date);
        if (day) day.events.push(res);
      });
    });
  }

  pay(index: number): void {
    this.reservationService.payReservation(index);
    this.loadReservations();
  }

  cancel(index: number): void {
    this.reservationService.cancelReservation(index);
    this.loadReservations();
  }

  remove(index: number): void {
    this.reservationService.removeReservation(index);
    this.loadReservations();
  }
}
