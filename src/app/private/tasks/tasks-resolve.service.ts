import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TasksService} from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class TasksResolveService implements Resolve<any>{
  constructor(private tasksService: TasksService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.tasksService.getAll();
  }
}
