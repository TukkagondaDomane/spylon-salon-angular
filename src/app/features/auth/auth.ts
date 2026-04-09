import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Toast } from '../../shared/components/toast/toast';
import { FirebaseDataService } from '../../shared/services/firebase-data.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, Toast],
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss'],
  providers: [Toast],
})
export class Auth {
  mode: 'login' | 'signup' = 'login';
  loading = false;
  toast: any = null;
  showPassword = false;

  form = {
    name: '',
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: Toast,
    private dataService: FirebaseDataService,
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;

    if (state?.showToast) {
      this.showToast('Please sign in to book', 'info');
    }
  }

  handleAuth() {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    const email = this.form.email?.trim();
    const password = this.form.password?.trim();

    if (!email || !password) {
      this.showToast('Please fill in all fields', 'error');
      return;
    }

    if (!emailRegex.test(email)) {
      this.showToast('Enter a valid email address', 'error');
      return;
    }

    if (!passwordRegex.test(password)) {
      this.showToast('Password must be 6+ chars with letters & numbers', 'error');
      return;
    }

    if (this.mode === 'signup') {
      if (!this.form.name) {
        this.showToast('Please fill in all fields', 'error');
        return;
      } else {
        this.signup(this.form.name, this.form.email, this.form.password);
      }
    } else {
      this.login(email, password);
    }
  }

  async signup(name: string, email: string, password: string) {
    try {
      this.loading = true;

      const res = await this.dataService.signup(name, email, password);

      if (res?.user) {
        this.router.navigate(['/services'], {
          state: { showToast: 'signup' },
        });
      }
    } catch (e) {
      this.showToast('Something went wrong!', 'error');
      this.cdr.detectChanges();
    } finally {
      this.loading = false;
    }
  }

  async login(email: string, password: string) {
    try {
      this.loading = true;

      const res = await this.dataService.login(email, password);

      if (res?.user) {
        this.router.navigate(['/services'], {
          state: { showToast: 'login' },
        });
      }
    } catch (e: any) {
      this.showToast('Invalid email or password', 'error');
    } finally {
      this.loading = false;
    }
  }

  setMode(mode: 'login' | 'signup') {
    this.mode = mode;
  }
  showToast(msg: string, type: string) {
    this.toast = { msg, type };
    this.toast = {
      msg: msg,
      type: type,
    };
    setTimeout(() => {
      this.toast = null;
      this.cdr.detectChanges();
    }, 3500);
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async forgotPassword() {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const email = this.form.email?.trim();

    if (!email) {
      this.showToast('Enter your email first', 'info');
      return;
    }

    if (!emailRegex.test(email)) {
      this.showToast('Enter a valid email address', 'error');
      this.cdr.detectChanges();
      return;
    }

    try {
      await this.dataService.resetPassword(email);
      this.showToast('If an account exists, reset email sent', 'success');
      this.cdr.detectChanges();
    } catch (e) {
      this.showToast('Reset failed', 'error');
      this.cdr.detectChanges();
    }
  }
}
