import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SearchStateService {
  private readonly _query = signal<string>(''); // default vuoto

  setQuery(term: string) {
    this._query.set(term);
  }

  get query() {
    return this._query.asReadonly(); // per leggere reattivamente
  }

  getQueryValue() {
    return this._query(); // per leggere imperativamente
  }
}
