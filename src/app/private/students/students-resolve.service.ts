import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {StudentsService} from './students.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsResolveService implements Resolve<any>{
  constructor(private studentsService: StudentsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.studentsService.getAll();
  }
}
