//import { scan } from 'rxjs/operator';
import { ChatService, Message } from './../../chat.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/scan';


@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit, OnDestroy {

  messages = [];//: Observable<Message[]>;
  formValue: string;

  constructor(public chat: ChatService) { }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    // this.messages = this.chat.conversation.asObservable()
    //     .scan((acc, val) => acc.concat(val) );
    
    this.chat.conversation.asObservable()
      .subscribe(message => {
        if(message.length)
          this.messages.push(message[0]);
      });
  }

  ngOnDestroy(){
    this.chat.conversation.unsubscribe();
  }

  sendMessage() {
    if(this.formValue)
      this.chat.converse(this.formValue);
    this.formValue = '';
  }

}
