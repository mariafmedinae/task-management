import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks:string[][] = [[], [], []];

  constructor() { }

  get() {
    return this.tasks;
  }

  createColumnOfTasks() {
    this.tasks.push([]);
  }

  deleteColumnOfTasks(index:any) {
    this.tasks.splice(index, 1);
  }

  create(task:any) {
    this.tasks[0].push(task);
  }

  update(newTask: any, index:any) {
    this.tasks[index[0]][index[1]] = newTask;
  }

  delete(index:any) {
    this.tasks[index[0]].splice(index[1], 1);
  }

  updateTaskStatus(index:any) {
    this.tasks[index[0] + 1].push(this.tasks[index[0]][index[1]]);
    this.tasks[index[0]].splice(index[1], 1);
  }
}
