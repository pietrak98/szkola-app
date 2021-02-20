import { Component, OnInit } from '@angular/core';
import {Class} from './classes/class';
import {MessagesService} from './messages/messages.service';
import {Message} from './messages/message';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})


export class PrivateComponent implements OnInit {

  showNav = true;

  constructor() { }

  ngOnInit(): void {
  }
}

