import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,  // ✅ Rend le composant standalone
  imports: [CommonModule, FormsModule], // ✅ Ajoute les modules nécessaires
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isRegisterMode = false;

  constructor(private router: Router) {}

  switchToRegister() {
    this.isRegisterMode = true;
  }

  switchToLogin() {
    this.isRegisterMode = false;
  }

  onSignup(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']); // redirection après inscription
  }

  onLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']); // redirection après connexion
  }
}
