import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TasksService} from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class TaskResolveService implements Resolve<any>{
  constructor(private tasksService: TasksService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.tasksService.get(route.params.id);
  }
}
