import { NgModule } from '@angular/core';
import { SideBarComponent } from './side-bar/side-bar.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [HeaderComponent, SideBarComponent],
  exports: [
    HeaderComponent, SideBarComponent
  ],
    imports: [
        RouterModule,
        NgbDropdownModule,
        CommonModule
    ]
})
export class SharedModule { }
