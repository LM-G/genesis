import { Injectable } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { LocalStorageUtils } from '@genesis/$shared/util/local-storage-utils';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter, map } from 'rxjs/operators';

export const MEDIA_MOBILE = 'xs';
const LOCAL_STORAGE_TOKEN = 'side-nav-state';

interface LocalStorageToken {
  minimized: boolean;
}

@Injectable()
export class SideNavState {
  collapsed$: BehaviorSubject<boolean>;
  minimized$: BehaviorSubject<boolean>;
  media$: BehaviorSubject<string>;

  constructor(private _obersableMedia: ObservableMedia) {
    const localStorageToken = this.getLocalStorageToken();
    this.minimized$ = new BehaviorSubject(localStorageToken.minimized || false);
    this.collapsed$ = new BehaviorSubject(true);
    this.media$ = new BehaviorSubject(null);
    this._obersableMedia.asObservable().pipe(
      map(mediaChange => mediaChange.mqAlias),
      filter(alias =>
        (alias === MEDIA_MOBILE && this.media$.getValue() !== MEDIA_MOBILE) ||
        (alias !== MEDIA_MOBILE && this.media$.getValue() === MEDIA_MOBILE) ||
        this.media$.getValue() == null
      )
    ).subscribe(this.onMediaChange.bind(this));
  }

  toggle() {
    if (this.media$.getValue() === MEDIA_MOBILE) {
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
    LocalStorageUtils.set(LOCAL_STORAGE_TOKEN, { minimized: this.minimized$.getValue() });
  }

  private onMediaChange(media: string) {
    const localStorageToken = this.getLocalStorageToken();
    console.log('media$ change', media);
    this.media$.next(media);
    if (media === MEDIA_MOBILE) {
      this.collapsed$.next(true);
      this.minimized$.next(false);
    } else {
      this.collapsed$.next(false);
      this.minimized$.next(localStorageToken.minimized || false);
    }
  }

  private getLocalStorageToken(): LocalStorageToken {
    return LocalStorageUtils.get(LOCAL_STORAGE_TOKEN) || {} as LocalStorageToken;
  }
}
