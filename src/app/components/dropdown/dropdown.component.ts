import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() options:any;
  @Input() icon = '';
  @Input() category:any;
  @Input() item:any;
  @Input() index:any;
  @Output() onClick = new EventEmitter();

  click(option:string) {
    this.onClick.emit({ category: this.category, item: this.item, index: this.index, action: option });
  } 
}
