import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCheckStage]',
})
export class CheckStage implements OnInit{
  @Input() appCheckStage!: string;
  constructor(private eleRef: ElementRef) {}
  ngOnInit():void{
    let bgColor = this.eleRef.nativeElement.classList;
    switch (this.appCheckStage) {
      case 'toDo': {
        return bgColor.add('to-do');
      }
      case 'inProgress': {
        return bgColor.add('in-progress');
      }
      case 'inReview': {
        return bgColor.add('in-review');
      }
      case 'done': {
        return bgColor.add('done');
      }
      default: {
        return bgColor;
      }
    }
  };
}
