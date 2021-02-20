import {Component, OnInit} from '@angular/core';
import {Class} from '../classes/class';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message} from './message';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MessagesService} from './messages.service';
import {noop} from 'rxjs';
import {UserProviderService} from '../user/userProvider.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessageComponent implements OnInit {
  public students: Message[] | undefined;
  public classes: Class[] | undefined;

  message: Message | undefined;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute, private router: Router, private messagesService: MessagesService,
              public loginUser: UserProviderService) {
  }

  ngOnInit(): void {
    this.message = this.route.snapshot.data.message;

    this.route.params.subscribe(params => {
      this.messagesService.setRead(params.id).subscribe(() => noop());
    });
  }
}
