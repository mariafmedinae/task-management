import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() label = '';
  @Input() validators:any;
  @Input() value = '';
  @Output() onChange = new EventEmitter(); 
   
  control:any;
  errorMessage = 'Este campo es obligatorio';

  // Set validators
  ngOnInit() {
    this.control = new FormControl(this.value, this.validators);
  }  

  // Update error message
  getError() {
    if(this.control.hasError('required')) this.errorMessage = 'Este campo es obligatorio';
    else if(this.control.hasError('maxlength')) this.errorMessage = 'Supera el máximo de caracteres permitidos';
  }

  // Pass value to parent component
  change(event: any) {
    this.onChange.emit(event.target.value);
    this.getError();
  }
}
