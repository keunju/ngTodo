import {Component, OnDestroy, OnInit} from '@angular/core';
import {MemberVO} from '../domain/member.vo';
import {ChatVO} from '../domain/chat.vo';
import {UserService} from '../user.service';
import {AuthGuardService} from '../auth/auth-guard.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  member: MemberVO;
  message: string;
  chatList = new Array<ChatVO>();
  ws: WebSocket;

  constructor(private userService: UserService, private authService: AuthGuardService) {

  }

  ngOnInit() {
    this.userService.getMember(this.authService.getMemberId())
      .subscribe(resp => {
        this.member = resp.body;
        this.init();
      });
  }

  init() {
    this.ws = new WebSocket("ws://www.javabrain.kr:8080/api/chat");

    this.ws.onopen = () => {
      console.log('web socket open');
    };

    this.ws.onmessage = (ev) => {
      console.log(ev.data);
      const chat = JSON.parse(ev.data) as ChatVO;

      if ("WhoAreYou" === chat.command) {
        this.ws.send(JSON.stringify({command: "IAmTom", from: this.member.nickname, member_id: this.member.member_id}));
      } else if ("SendToEveryone" === chat.command) {
        console.log(chat.message);
        this.chatList.push(chat);
      }
    };

    this.ws.onclose = () => {
      console.log('close');
    };
  }

  ngOnDestroy(): void {
    this.ws.close();
  }

  send() {
    this.ws.send(JSON.stringify({command: "SendToEveryone", from: this.member.nickname, message: this.message,
      date: new Date().getTime()}));
    this.message = null;
  }
}
