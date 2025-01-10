import { Component, Input, SimpleChange } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DatatableComponent } from '../components/datatable/datatable.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [DatatableComponent],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss'
})
export class TableViewComponent {
  updateTable: Subject<any> = new Subject();
  @Input() statuses = [];
  @Input() tasks:any;

  tasksData:any = [];
  rowClicked:any;

  // Table columns
  tableNames = {
    title: 'Título',
    status: "Estado",
    Actualizar: "Actualizar",
    Cambiar_estado: 'Cambiar estado',
    Eliminar: "Eliminar",
  };

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    let id = 0;
    for (let i = 0; i < this.tasks.length; i++) {
      for (let j = 0; j < this.tasks[i].length; j++) {
        this.tasksData.push(
          {
            id: id,
            title: this.tasks[i][j],
            status: this.statuses[i],
            index: [i, j],
            lastStatus: i === (this.tasks.length - 1)
          }
        )
        id++;
      }      
    }
  }

  tableActions(event: any) {
    this.rowClicked = event.element.id;

    let dialogRef = this.dialog.open(ModalComponent, {
      width: "500px",
      data: {
        action: event.action,
        category: 'tarea',
        item: event.element.title,
        index: event.element.index,
        statuses: this.statuses
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result !== 'close') {
        let index = this.tasksData.findIndex((element: { id: any; }) => element.id === this.rowClicked);
        if(event.action === 'Actualizar') {
          this.tasksData[index].title = this.tasks[event.element.index[0]][event.element.index[1]];
        } else if(event.action === 'Eliminar') {          
          this.tasksData.splice(index, 1);
          this.updateTable.next(this.rowClicked);
        } else if(event.action === 'Cambiar estado') {  
          // Update tabla data 
          let newStatusIndex = event.element.index[0] + 1;     
          this.tasksData[index].status = this.statuses[newStatusIndex]; 
          this.tasksData[index].index = [newStatusIndex, this.tasks[newStatusIndex].length - 1];
          this.tasksData[index].lastStatus = newStatusIndex === (this.tasks.length - 1);
        }
      }
    })    
  }
}
