import { Component, Input, inject } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ButtonComponent } from '../components/button/button.component';
import { DropdownComponent } from '../components/dropdown/dropdown.component';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TasksService } from '../services/tasks.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cards-view',
  standalone: true,
  imports: [ButtonComponent, DropdownComponent, CdkDropList, CdkDrag],
  templateUrl: './cards-view.component.html',
  styleUrl: './cards-view.component.scss'
})
export class CardsViewComponent {
  @Input() statuses = [];
  @Input() tasks:any;  

  constructor(
    public dialog: MatDialog,
    private tasksService: TasksService,
  ) { } 

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  addStatus() {
    let dialogRef = this.dialog.open(ModalComponent, {
      width: "500px",
      data: {
        action: 'Crear',
        category: 'estado'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result !== 'close') {
        this.tasksService.createColumnOfTasks();
      }      
    })
  }

  actions(event:any) {
    let deleteValidation = event.category === 'estado' ? this.tasks[event.index].length !== 0 : false;
    if(event.action === 'Eliminar' && deleteValidation) {
      this.openSnackBar('No se puede eliminar un estado que contenga tareas', 'X');
    } else {
      let dialogRef = this.dialog.open(ModalComponent, {
        width: "500px",
        data: {
          action: event.action,
          category: event.category,
          item: event.item,
          index: event.index
        }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if(result !== 'close' && event.action === 'Eliminar'&& event.category === 'estado') {
          this.tasksService.deleteColumnOfTasks(event.index);
        }      
      })
    }    
  }

  statusIds() {
    return this.statuses.map((status, i) => String(i));
  }

  drop(event: CdkDragDrop<string[][]>) {
    let previousStatus = Number(event.previousContainer.id);
    let currentStatus = Number(event.container.id);

    if(Math.abs(currentStatus - previousStatus) > 1) {
      this.openSnackBar('Las tareas sólo se pueden cambiar al siguiente o anterior estado disponible', 'X');
    } else {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }    
  }
}