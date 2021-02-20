import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Class} from '../classes/class';
import {ClassesService} from '../classes/classes.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message} from './message';
import {MessagesService} from './messages.service';
import {ActivatedRoute} from '@angular/router';
import {ToastService} from '../../core/toast/toast.service';
import {environment} from '../../../environments/environment';
import {UserProviderService} from '../user/userProvider.service';

@Component({
  selector: 'app-students',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public messages: Message[] | undefined;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private classesService: ClassesService,
              private studentsService: MessagesService,
              private toastService: ToastService,
              public loginUser: UserProviderService) {
  }

  ngOnInit(): void {
    this.messages = this.route.snapshot.data.messages;
  }
}
