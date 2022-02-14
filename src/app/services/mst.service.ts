import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MstService {
  private clear$: Subject<void> = new Subject<void>();

  clear(): void {
    this.clear$.next();
  }

  clearSubject(): Observable<void> {
    return this.clear$.asObservable();
  }
}
