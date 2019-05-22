import {Component, Input, OnInit} from '@angular/core';
import {Confession} from "../../models/confession.model";

@Component({
  selector: 'app-minimized-confession',
  templateUrl: './minimized-confession.component.html',
  styleUrls: ['./minimized-confession.component.css']
})
export class MinimizedConfessionComponent implements OnInit {
  @Input() confession: JSON;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
