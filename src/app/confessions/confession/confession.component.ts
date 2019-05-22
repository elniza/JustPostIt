import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {ConfessionsService} from "../../confessions.service";
import {Confession} from "../../models/confession.model";

@Component({
  selector: 'app-post',
  templateUrl: './confession.component.html',
  styleUrls: ['./confession.component.css']
})
export class ConfessionComponent implements OnInit {
id: string;
confession;
like: string = 'Like';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private confessionsService: ConfessionsService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.confessionsService.getConfession(this.id)
      .subscribe((response: Response) => {
        this.confession=response;
      });
  }

  onEditConfession(){
    // this.confessionsService.startEditingAndSendIndex(this.id);
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onLike(){
    if(this.like==='Like'){
      this.like = 'Unlike';
      // this.confessionsService.addLike(this.id, this.confession.author);
    }
    else{
      this.like = 'Like';
      // this.confessionsService.removeLike(this.id, this.confession.author);
    }

  }

}
