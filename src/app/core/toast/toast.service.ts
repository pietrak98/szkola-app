import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(header: string, body: string): void {
    this.toasts.push({ header, body });
  }

  saved(): void {
    this.show('Sukces', 'zapisano...');
  }
}
