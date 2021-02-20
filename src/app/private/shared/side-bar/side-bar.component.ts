import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(public route: ActivatedRoute) {

    this.route.data.subscribe(value => {
      console.log('Some extra data:', value);
    });
  }

  ngOnInit(): void {
  }

}
