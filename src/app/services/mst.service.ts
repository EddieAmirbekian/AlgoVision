import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class MstService {
  private clear$: Subject<void> = new Subject<void>();

  public clear(): void {
    this.clear$.next();
  }

  public clearSubject(): Observable<void> {
    return this.clear$.asObservable();
  }
}
