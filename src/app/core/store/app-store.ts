import { Injectable } from '@angular/core';
import { TokensHolder } from '@genesis/core/api/auth/model/tokens-holder';
import { User } from '@genesis/shared/model/user';
import { LocalStorageUtils } from '@genesis/util/local-storage-utils';

const TOKENS = 'tokens';

@Injectable()
export class AppStore {
  private _tokens: TokensHolder;

  get tokens(): TokensHolder {
    return { ...this._tokens };
  }

  private _user: User;

  get user(): User {
    return { ...this._user };
  }

  constructor() {
    this._tokens = LocalStorageUtils.get<TokensHolder>(TOKENS) || {} as TokensHolder;
    this._user = new User();
  }

  setTokens(tokens: TokensHolder) {
    const newTokens = Object.assign(this._tokens, { ...tokens });
    LocalStorageUtils.set(TOKENS, newTokens);
    return newTokens;
  }

  setUser(user: User): User {
    return Object.assign(this._user, { ...user });
  }

  reset() {
    this._tokens = {} as TokensHolder;
    this._user = new User();
    LocalStorageUtils.clear();
  }
}
