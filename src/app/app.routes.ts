import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./accueil/accueil.component').then(m => m.AccueilComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'services',
    loadComponent: () => import('./services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'cadeaux',
    loadComponent: () => import('./cadeaux/cadeaux.component').then(m => m.CadeauxComponent)
  },
  {
    path: 'sorties',
    loadComponent: () => import('./sorties/sorties.component').then(m => m.SortiesComponent)
  },
  {
    path: 'evenements',
    loadComponent: () => import('./evenements/evenements.component').then(m => m.EvenementsComponent)
  },
  {
    path: 'booking',
    loadComponent: () => import('./booking/booking.component').then(m => m.BookingComponent)
  },
  {
    path: 'plans',
    loadComponent: () => import('./plans/plans.component').then(m => m.PlansComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
  },
  {
    path: 'panier',
    loadComponent: () => import('./panier/panier.component').then(m => m.PanierComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
