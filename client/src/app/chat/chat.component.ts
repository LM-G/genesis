import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'genesis-chat',
    templateUrl: './chat.component.html',
    styleUrls: [ './chat.component.css' ]
})

export class ChatComponent implements OnInit {
    rooms = [{name: 'room_1', color:'#da9284'},{name: 'room_2', color:'#2fb682'}];
    constructor() {}

    ngOnInit() {
        // todo get user rooms
    }
}
