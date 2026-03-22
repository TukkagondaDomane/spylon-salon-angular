import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Toast } from '../../shared/components/toast/toast';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, Toast],
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss'],
})
export class Auth {
  mode: 'login' | 'signup' = 'login';
  loading = false;
  toast: any = null;

  form = {
    name: '',
    email: '',
    password: '',
    phone: '',
  };

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;

    if (state?.showToast) {
      this.toast = {
        msg: 'Please sign in to book',
        type: 'info',
      };
    }
  }

  handle() {
    if (!this.form.email || !this.form.password) return;
    if (this.mode === 'signup' && !this.form.name) return;

    this.loading = true;

    setTimeout(() => {
      this.loading = false;

      const user = {
        name: this.form.name || this.form.email.split('@')[0],
        email: this.form.email,
        phone: this.form.phone || '+91 98765 43210',
        wallet: 500,
      };

      localStorage.setItem('user', JSON.stringify(user));

      this.router.navigate(['/services']);
    }, 1500);
  }

  setMode(m: 'login' | 'signup') {
    this.mode = m;
  }
  clearToast() {
    this.toast = null;
  }
}
