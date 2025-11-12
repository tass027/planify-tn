import { Component, AfterViewInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- bien ajouté
import { LoginComponent } from '../login/login.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, LoginComponent, RouterOutlet], // <-- FormsModule ici
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements AfterViewInit {
  isMenuOpen = false;
  showLoginModal = false;
  userLoggedIn = true;
  selectedEmoji = '';
  userComment = '';

  feedbacks = [
    { name: 'John Doe', avatar: 'assets/avatar1.png', comment: 'Great service!', emoji: '😃' },
    { name: 'Jane Smith', avatar: '', comment: 'Loved it!', emoji: '🙂' }
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  submitFeedback(): void {
    if (!this.selectedEmoji || !this.userComment.trim()) return;

    this.feedbacks.push({
      name: 'Vous',
      avatar: '',
      comment: this.userComment,
      emoji: this.selectedEmoji
    });

    this.userComment = '';
    this.selectedEmoji = '';
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el as Element));
  }
}
