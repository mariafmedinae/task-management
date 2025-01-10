import { Component } from '@angular/core';
import { ButtonComponent } from '../components/button/button.component';
import { FormsModule } from '@angular/forms';
import { TableViewComponent } from '../table-view/table-view.component';
import { CardsViewComponent } from '../cards-view/cards-view.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { ToggleButtonComponent } from '../components/toggle-button/toggle-button.component';
import { StatusesService } from '../services/statuses.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, ButtonComponent, TableViewComponent, CardsViewComponent, LoaderComponent, ToggleButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isLoading = true;
  currentView = 'cardsView';
  statusesList:any;
  tasksList:any;

  viewsList = [
    {
      value: 'cardsView',
      text: 'Vista tarjetas'
    },
    {
      value: 'tableView',
      text: 'Vista tabla'
    }
  ];

  constructor(
    private statusesService: StatusesService,
    private tasksService: TasksService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // Loader simulation of getting tasks data
    setTimeout(() => {
      this.isLoading = false;
      this.statusesList = this.statusesService.get();
      this.tasksList = this.tasksService.get();
    }, 1000);
  }

  changeView(event: any) {
    this.currentView = event;
  }

  addTask() {
    this.dialog.open(ModalComponent, {
      width: "500px",
      data: {
        action: 'Crear',
        category: 'tarea'
      }
    });
  }
}
