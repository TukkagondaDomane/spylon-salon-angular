import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  user: any = null;
  stats = [
    { number: '2,500+', label: 'Happy Clients' },
    { number: '15+', label: 'Expert Stylists' },
    { number: '30+', label: 'Services' },
    { number: '4.9★', label: 'Average Rating' },
  ];
  features = [
    {
      icon: '🏆',
      title: 'Award Winning',
      desc: "Recognised as Bangalore's top salon 3 years running",
    },
    {
      icon: '🌿',
      title: 'Organic Products',
      desc: '100% natural, cruelty-free products for every service',
    },
    {
      icon: '⚡',
      title: 'Instant Booking',
      desc: 'Book in seconds, get confirmed in real time',
    },
    {
      icon: '💎',
      title: 'Luxury Experience',
      desc: 'Premium service with personalized attention every visit',
    },
    {
      icon: '💳',
      title: 'Secure Payments',
      desc: 'Safe and seamless payment experience with trusted gateways',
    },
    {
      icon: '🔄',
      title: 'Easy Rescheduling',
      desc: 'Modify or reschedule your bookings anytime with ease',
    },
  ];
  constructor(private router: Router) {}
  goServices() {
    this.router.navigate(['/services']);
  }
  goAuth() {
    this.router.navigate(['/auth']);
  }
}
