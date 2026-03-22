import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Toast } from '../../shared/components/toast/toast';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, Toast],
  templateUrl: './services.html',
  styleUrls: ['./services.scss'],
})
export class Services {
  category = 'All';
  booking: any = null;
  user: any = null; // later from auth
  toast: any = null;

  CATEGORIES = ['All', 'Hair', 'Wellness', 'Nails', 'Skin', 'Men', 'Bridal'];

  STAFF = [
    { id: 1, name: 'Priya S.', emoji: '👩', rating: 4.9, specialty: 'Hair' },
    { id: 2, name: 'Rohan M.', emoji: '👨', rating: 4.8, specialty: 'Wellness' },
    { id: 3, name: 'Ananya K.', emoji: '👩‍🦱', rating: 5.0, specialty: 'Nails' },
    { id: 4, name: 'Vikram R.', emoji: '👨‍🦲', rating: 4.7, specialty: 'Skin' },
    { id: 5, name: 'Meera T.', emoji: '👩‍🦰', rating: 4.9, specialty: 'Bridal' },
  ];

  SERVICES = [
    {
      id: 1,
      name: 'Haircut & Style',
      price: 899,
      duration: '45 min',
      category: 'Hair',
      desc: 'Precision cut and blowout styling by our expert stylists. Includes wash & conditioning treatment.',
      color: '#c9a84c',
    },
    {
      id: 2,
      name: 'Luxury Massage',
      price: 1499,
      duration: '60 min',
      category: 'Wellness',
      desc: 'Deep tissue or Swedish relaxation massage with premium aromatic oils.',
      color: '#e05a7a',
    },
    {
      id: 3,
      name: 'Nail Artistry',
      price: 599,
      duration: '30 min',
      category: 'Nails',
      desc: 'Gel, acrylic or natural nail treatments with custom art designs.',
      color: '#3ecfb2',
    },
    {
      id: 4,
      name: 'Facial Glow',
      price: 1299,
      duration: '50 min',
      category: 'Skin',
      desc: 'Deep cleansing facial with hydrotherapy and organic serum infusion.',
      color: '#b87fff',
    },
    {
      id: 5,
      name: 'Hair Coloring',
      price: 2499,
      duration: '120 min',
      category: 'Hair',
      desc: 'Balayage, highlights, or full color by certified colorists. Includes glossing treatment.',
      color: '#c9a84c',
    },
    {
      id: 6,
      name: 'Beard Grooming',
      price: 499,
      duration: '25 min',
      category: 'Men',
      desc: 'Precision beard shaping, trimming and hot towel treatment for the modern gentleman.',
      color: '#6dc96d',
    },
    {
      id: 7,
      name: 'Waxing Session',
      price: 799,
      duration: '40 min',
      category: 'Skin',
      desc: 'Full body waxing with soothing aloe vera aftercare treatment.',
      color: '#3ecfb2',
    },
    {
      id: 8,
      name: 'Bridal Package',
      price: 5999,
      duration: '240 min',
      category: 'Bridal',
      desc: 'Complete bridal transformation including makeup, hair, nails and a complimentary facial.',
      color: '#e05a7a',
    },
  ];
  constructor(private router: Router) {}

  get filtered() {
    if (this.category === 'All') return this.SERVICES;
    return this.SERVICES.filter((s) => s.category === this.category);
  }

  setCategory(cat: string) {
    this.category = cat;
  }

  book(service: any) {
    if (!this.user) {
      this.router.navigate(['/auth'], {
        state: { showToast: true },
      });
      return;
    }
  }

  showToast(msg: string, type: string = 'info') {
    this.toast = { msg, type };
  }

  clearToast() {
    this.toast = null;
  }
}
