import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private _isLoading = new BehaviorSubject(false);

  get isLoading$() {
    return this._isLoading.asObservable();
  }

  constructor() {}

  public initLoding() {
    this._isLoading.next(true);
  }

  public stopLoading() {
    this._isLoading.next(false);
  }
}
