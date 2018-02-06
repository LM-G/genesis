import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { stompConfig } from '@genesis/$core/config/stomp';
import { Unsubscriber } from '@genesis/$shared/util/unsubscriber';
import { StompRService, StompState } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: [ './lab.component.scss' ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LabComponent implements OnInit, OnDestroy {
  subscriber: Unsubscriber = new Unsubscriber();
  connected = false;

  constructor(private _stompService: StompRService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.connect();
  }

  ngOnDestroy() {
    this.disconnect();
  }

  connect() {
    this._stompService.config = stompConfig;

    this._stompService.state
      .subscribe((state: StompState) => {
        if (state === StompState.CONNECTED) {
          this.connected = true;
        }
        if (state === StompState.CLOSED) {
          this.connected = false;
        }
        this.cd.detectChanges();
      });

    this._stompService.initAndConnect();


    this._stompService.subscribe('/queue/pong')
      .pipe(
        takeUntil(this.subscriber),
        map((message: Message) => {
          console.log(`Received message:`, message);
          return message.body;
        })
      )
      .subscribe((msg_body: string) => {
        console.log(`Received: ${msg_body}`);
      });
  }

  disconnect() {
    this.subscriber.close();
    this._stompService.disconnect();
  }

  ping() {
    // un super service stomp qui met les header tout seul et qui stringify si payload == object || array
    this._stompService.publish('/ping', 'My important message', {
      'content-type': 'text/plain;charset=UTF-8'
    });
  }
}
