import { Injectable } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter, map } from 'rxjs/operators';

const IS_MOBILE = 'xs';

@Injectable()
export class SideNavState {
  collapsed$: BehaviorSubject<boolean>;
  minimized$: BehaviorSubject<boolean>;
  media$: BehaviorSubject<string>;

  constructor(private _obersableMedia: ObservableMedia) {
    this.minimized$ = new BehaviorSubject(false);
    this.collapsed$ = new BehaviorSubject(true);
    this.media$ = new BehaviorSubject(null);
    this._obersableMedia.asObservable().pipe(
      map(mediaChange => mediaChange.mqAlias),
      filter(alias =>
        (alias === IS_MOBILE && this.media$.getValue() !== IS_MOBILE) ||
        (alias !== IS_MOBILE && this.media$.getValue() === IS_MOBILE) ||
        this.media$.getValue() == null
      )
    ).subscribe(this.onMediaChange.bind(this));
  }

  toggle() {
    if (this.media$.getValue() === IS_MOBILE) {
      this.toggleCollapsed();
    } else {
      this.toggleMinimized();
    }
  }

  toggleCollapsed() {
    this.collapsed$.next(!this.collapsed$.getValue());
  }

  toggleMinimized() {
    this.minimized$.next(!this.minimized$.getValue());
  }

  private onMediaChange(media: string) {
    console.log('media$ change', media);
    this.media$.next(media);
    if (media === IS_MOBILE) {
      this.collapsed$.next(true);
      this.minimized$.next(false);
    } else {
      this.collapsed$.next(false);
      this.minimized$.next(false);
    }
  }
}
