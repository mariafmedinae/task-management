import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StatusesService {
  statuses = ['Pendiente', 'En proceso', 'Finalizado'];

  constructor() { }

  get() {
    return this.statuses;
  }

  create(status: any) {
    this.statuses.push(status);
  }

  update(newStatus: any, index:any) {
    this.statuses[index] = newStatus;
  }

  delete(index: number) {
    this.statuses.splice(index, 1);
  }
}
