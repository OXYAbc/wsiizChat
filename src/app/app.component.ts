import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wsiizChat';

  constructor(
    private appService: AppService,
    private elementRef: ElementRef,
    private overlayContainer: OverlayContainer
  ) {
    const container = this.overlayContainer.getContainerElement();
    this.appService.getFontSize().subscribe((res: number) => {
      document.body.style.fontSize = `${res}px`;
    });
  }
}
