import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.scss'],
})
export class Toast implements OnInit {
  @Input() toast: any;
  @Output() close = new EventEmitter<void>();

  icons: any = {
    success: '✅',
    error: '❌',
    info: '💫',
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}
}
