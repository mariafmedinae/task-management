import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-toggle-button',
  standalone: true,
  imports: [MatButtonToggleModule, FormsModule],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss'
})
export class ToggleButtonComponent {
  @Input() options:any;
  @Input() currentSelection = '';
  @Output() onClick = new EventEmitter();

  click() {
    this.onClick.emit(this.currentSelection);
  }
}
