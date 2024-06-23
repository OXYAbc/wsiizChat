import { Dialog } from '@angular/cdk/dialog';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl} from "@angular/forms";
import {ChatBotService} from "../../chat-bot/chat-bot.service";
import {LoginService} from "../../login/login.service";

export interface Message {
  sender: string;
  mess: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
})
export class ChatBotComponent {
  message = new FormControl<string>('');
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  conversation: Message[] = [];
  loading: boolean = false;
  number = 0;

  constructor(private service: ChatBotService,
              private router: Router,
              private loginService: LoginService) {
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  send() {
    if (this.message.value) {
      this.conversation?.push({sender: 'user', mess: this.message.value});
      this.loading = true;
      this.service.requestApi(this.message.value).subscribe((res) => {
        this.loading = false;
        this.conversation?.push({sender: 'bot', mess: res});
      });
      this.number++;
      this.message.reset('')
    }
  }

  logOut(){
    this.loginService.logout();
  }

  scrollToBottom() {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
}
