import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { FirebaseDataService } from '../../shared/services/firebase-data.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  user: any = null;
  stats: { number: string; label: string }[] = [];
  features: { icon: string; title: string; desc: string }[] = [];
  constructor(
    private router: Router,
    private firebase: FirebaseDataService,
    private cdr: ChangeDetectorRef,
  ) {}
  async ngOnInit() {
    this.stats = await this.firebase.getData('home', 'homeStats', 'stats');
    this.features = await this.firebase.getData('home', 'homeFeatures', 'homeFeatures');
    this.cdr.detectChanges();
  }
  goServices() {
    this.router.navigate(['/services']);
  }
  goAuth() {
    this.router.navigate(['/auth']);
  }
}
