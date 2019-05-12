import { Observable, Subject } from 'rxjs';

export class ModalRef {
  private readonly _afterClosed = new Subject<any>();
  public afterClosed: Observable<any> = this._afterClosed.asObservable();

  constructor() {}

  close(result?: any) {
    this._afterClosed.next(result);
  }
}
