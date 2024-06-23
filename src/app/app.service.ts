import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  private actualFontSize = new BehaviorSubject<number>(10);
  getFontSize() {
    return this.actualFontSize.asObservable();
  }

  constructor() {}
  onResizeFont(size: number) {
    this.actualFontSize.next(size);
  }
}
