import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-minimized-post',
  templateUrl: './minimized-post.component.html',
  styleUrls: ['./minimized-post.component.css']
})
export class MinimizedPostComponent implements OnInit {
  @Input() post;

  constructor() {
  }

  ngOnInit() {
  }

}
