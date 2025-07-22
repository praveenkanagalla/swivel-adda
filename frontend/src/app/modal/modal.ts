import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,  // ✅ Required for Angular 14+ standalone components
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.css']  // ✅ Correct property name
})
export class Modal {

  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }

}
