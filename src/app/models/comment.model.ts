import {User} from "./user.model";

export class Comment{

author: User;
title: string;
content: string;
  constructor(author: User, title: string, content: string){
    this.author = author;
    this.title=title;
    this.content=content;
  }
}
