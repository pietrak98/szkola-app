import { Component } from '@angular/core';
import {ToastService} from './core/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'medium-laravel-angular-auth-front';

  constructor(public toastService: ToastService) {
  }
}
