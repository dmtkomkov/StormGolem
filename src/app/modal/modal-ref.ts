import { Subject } from 'rxjs';

export class ModalRef {
  public afterClosed = new Subject<any>();

  close(result = null) {
    this.afterClosed.next(result);
  }
}
