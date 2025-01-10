import { Component, Inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';
import { BasicButtonComponent } from '../basic-button/basic-button.component';
import { InputComponent } from '../input/input.component';
import { Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { StatusesService } from '../../services/statuses.service';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ButtonComponent,
    BasicButtonComponent,
    InputComponent,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  isLoading = false;
  titleValidators = [Validators.required, Validators.maxLength(20)];
  title = '';
  action = '';
  category = '';
  item:any;
  index:any;
  statuses:any

  // Form inputs an validations
  formGroup = this.formBuilder.group({
    title: ['', this.titleValidators],
  });

  constructor(
    private formBuilder: FormBuilder,
    private statusesService: StatusesService,
    private tasksService: TasksService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    this.title = `${data.action} ${data.category}`;
    this.action = data.action;
    this.category = data.category;
    this.item = data.item;
    this.index = data.index;
    this.statuses = data.statuses;
  }

  updateInput(input: string, event: any) {
    this.formGroup.get(input)?.setValue(event);
  }

  getButtonLabel() {
    return this.isLoading ? this.action.slice(0, -1) + 'ndo' : this.action;
  }

  closeModal() {
    this.dialogRef.close('close');
  }

  click() {
    this.isLoading = true;
    let inputValue = this.formGroup.get('title')?.value;
    let service = this.category === 'estado' ?this.statusesService : this.tasksService;    

    setTimeout(() => {
      switch (this.action) {
        case 'Crear':
          this.dialogRef.close(service.create(inputValue));
          break;
        case 'Actualizar':
          this.dialogRef.close(service.update(inputValue, this.index));
          break;
        case 'Cambiar estado':
          this.dialogRef.close(this.tasksService.updateTaskStatus(this.index));
          break;
  
        default:
          this.dialogRef.close(service.delete(this.index));
          break;
      }
    }, 500);
  }
}
