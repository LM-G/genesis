import { Component, OnInit } from '@angular/core';

/**
 * Chat component
 */
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [ './chat.component.scss' ]
})
export class ChatComponent implements OnInit {
  rooms = [ { name: 'room_1', color: '#da9284' }, { name: 'room_2', color: '#2fb682' } ];

  constructor() {}

  ngOnInit() {
    // todo get user rooms
  }
}
