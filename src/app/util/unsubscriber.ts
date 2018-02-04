import { Subject } from 'rxjs/Subject';

export class Unsubscriber extends Subject<void> {
  close(): void {
    this.next();
    this.complete();
  }
}
