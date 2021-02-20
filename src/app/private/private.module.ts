import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeModule} from './home/home.module';
import {UserModule} from './user/user.module';
import {PrivateComponent} from './private.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserResolveService} from './user/user-resolve.service';
import {AuthGuardService} from '../services/auth-guard.service';
import {SharedModule} from './shared/shared.module';
import {StudentsComponent} from './students/students.component';
import {StudentsResolveService} from './students/students-resolve.service';
import {StudentsModule} from './students/students.module';
import {TasksComponent} from './tasks/tasks.component';
import {TasksResolveService} from './tasks/tasks-resolve.service';
import {TasksModule} from './tasks/tasks.module';
import {GradesAddComponent} from './tasks/grades-add.component';
import {TaskResolveService} from './tasks/task-resolve.service';
import {MessagesModule} from './messages/messages.module';
import {MessagesComponent} from './messages/messages.component';
import {MessageComponent} from './messages/message.component';
import {MessagesResolveService} from './messages/messages-resolve.service';
import {MessageResolveService} from './messages/message-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    resolve: {user: UserResolveService},
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        component: HomeComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
        resolve: {students: StudentsResolveService},
      },
      {
        path: 'tasks',
        component: TasksComponent,
        resolve: {tasks: TasksResolveService},
      },
      {
        path: 'tasks/:id',
        component: GradesAddComponent,
        resolve: {task: TaskResolveService},
      },
      {
        path: 'messages',
        component: MessagesComponent,
        resolve: {messages: MessagesResolveService},
      },
      {
        path: 'messages/:id',
        component: MessageComponent,
        resolve: {message: MessageResolveService},
      },
    ]
  }
];

@NgModule({
  declarations: [PrivateComponent],
  imports: [
    SharedModule, HomeModule, UserModule, CommonModule,
    RouterModule.forChild(routes), SharedModule,
    StudentsModule, TasksModule, MessagesModule
  ],
})
export class PrivateModule {
}
