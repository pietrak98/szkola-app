import {Component, Inject, OnInit} from '@angular/core';
import {PrivateComponent} from '../../private.component';
import {User} from '../../user/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {Message} from '../../messages/message';
import {MessagesService} from '../../messages/messages.service';
import {filter} from 'rxjs/operators';
import {UserProviderService} from '../../user/userProvider.service';

class UsersService {
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User | undefined;
  private loading = false;
  messages: Message[] = [];

  constructor(@Inject(PrivateComponent) private parent: PrivateComponent,
              private route: ActivatedRoute, public authService: AuthService,
              private router: Router, private messagesService: MessagesService,
              public loginUser: UserProviderService) {
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.data.user;
    // @ts-ignore
    this.route.data.subscribe(data => {
      console.log(data.user);

      localStorage.setItem('user', JSON.stringify(data.user));
    });

    this.messagesService.getAll().subscribe((data: Message[]) => this.messages = data);
  }

  // tslint:disable-next-line:typedef
  toogleNav() {
    this.parent.showNav = !this.parent.showNav;
  }

  countUnReadMessages(): number {
    return  this.messages?.reduce((sum: number, obj) => {
      if (!obj.status) {
        return sum + 1;
      }
      return sum;
    }, 0) || 0;
  }

  /**
   * Logout the user and revoke his token
   */
  logout(): void {
    this.loading = true;
    this.authService.logout()
      .subscribe(() => {
        this.loading = false;
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
      });
  }
}
