import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Toast } from '../../shared/components/toast/toast';
import { FirebaseDataService } from '../../shared/services/firebase-data.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, Toast],
  templateUrl: './services.html',
  styleUrls: ['./services.scss'],
  providers: [Toast],
})
export class Services implements OnInit {
  category = 'All';
  booking: any = null;
  user: any = null; // later from auth
  toast: any = null;
  categories = [];
  staff: { id: number; name: string; emoji: string; specialty: string }[] = [];
  services: {
    id: number;
    name: string;
    price: number;
    duration: string;
    category: string;
    desc: string;
  }[] = [];

  constructor(
    private router: Router,
    private firebase: FirebaseDataService,
    private cdr: ChangeDetectorRef,
    private toastService: Toast,
  ) {
    const state = history.state as any;
    if (state?.showToast === 'signup') {
      this.showToast('Account created successfully', 'success');
    }

    if (state?.showToast === 'login') {
      this.showToast('Welcome back!', 'success');
    }
  }
  async ngOnInit() {
    this.categories = await this.firebase.getData(
      'Services',
      'servicesCategories',
      'servicesCategories',
    );
    this.staff = await this.firebase.getData('Services', 'servicesStaff', 'servicesStaff');
    this.services = await this.firebase.getData('Services', 'servicesService', 'servicesService');
    this.cdr.detectChanges();
  }

  get filtered() {
    if (this.category === 'All') return this.services;
    return this.services.filter((s) => s.category === this.category);
  }

  setCategory(cat: string) {
    this.category = cat;
  }

  book(service: any) {
    if (!this.user) {
      this.router.navigate(['/auth'], {
        state: { showToast: true },
      });
    }
  }

  getStylistsForService(category: string) {
    return this.staff.filter((s) => s.specialty?.includes(category));
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
}
