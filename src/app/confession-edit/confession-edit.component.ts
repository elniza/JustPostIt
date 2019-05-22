import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Confession} from "../models/confession.model";
import {User} from "../models/user.model";
import {ConfessionsService} from "../confessions.service";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-new-confession',
  templateUrl: './confession-edit.component.html',
  styleUrls: ['./confession-edit.component.css']
})

export class ConfessionEditComponent implements OnInit {
  private subscription: Subscription;
  editMode=false;
  editedItemIndex: number;
  editedItem: Confession;
  action: string = 'Create';
  mode: string;

  constructor(private route: ActivatedRoute,
              private confessionsService: ConfessionsService,
              private router: Router) { }

  ngOnInit() {
    this.route.url.subscribe(
      (url: UrlSegment[]) => {
        this.mode=url[url.length-1]['path'];
        if(this.mode=='edit'){
          this.subscribe();
        }
      }
    );


  }

  subscribe(){
   // console.log('init')
    this.subscription = this.confessionsService.data
      .subscribe(
        (index: number) => {
        //  console.log('edit mode');
          this.action = 'Edit';
          this.editedItemIndex = index;
          this.editMode = true;
         // console.log(this.editMode);
          //console.log(this.editedItemIndex);
          // this.editedItem = this.confessionsService
          //   .getConfession(index);
          // this.slForm.setValue({
          //     name: this.editedItem.name,
          //     amount: this.editedItem.amount
          //   }
          // );
        }
      );
    this.subscription.unsubscribe();
  }


  onEditConfession(confessionForm: NgForm){
    const title =  confessionForm.controls['title'].value;
    const content = confessionForm.controls['content'].value;

    // const newConfession = new Confession(
    //   new User("ExampleUser","1"),
    // confessionForm.controls['title'].value,
    // confessionForm.controls['content'].value
    // );
    this.confessionsService.createConfession(title, content).subscribe();
    // if(!this.editMode){
    //   this.confessionsService.addConfession(newConfession);
    // }
    // else{
    //   this.confessionsService.updateConfession(this.editedItemIndex, newConfession);
    // }
    //
    // this.router.navigate(['']);
}

}
