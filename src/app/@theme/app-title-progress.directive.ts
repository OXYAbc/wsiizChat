import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Task } from '../models/projects.model';

@Directive({
  selector: '[appTitleProgress]',
})
export class TitleProgress implements OnInit{
  @Input() appTitleProgress!: Task[];
  constructor(private eleRef: ElementRef) {}
  ngOnInit():void{
    this.eleRef.nativeElement.title = this.levelOfComplited(this.appTitleProgress)
  };

  levelOfComplited(tasks: Task[]):string {
    const mainLength: number = tasks.length;
    const toDoPercent: number =
      (tasks.filter((res: Task) => res.stage == 'toDo').length /
        mainLength) *
      100;
    const inProgressPercent: number =
      (tasks.filter((res: Task) => res.stage == 'inProgress').length /
        mainLength) *
      100;
    const inReviewPercent: number =
      (tasks.filter((res: Task) => res.stage == 'inReview').length /
        mainLength) *
      100;
    const donePercent: number =
      (tasks.filter((res: Task) => res.stage == 'done').length /
        mainLength) *
      100;
    return `Project complited✔ in ${donePercent.toFixed(
      2
    )} %, tasks to do: 🟧${toDoPercent.toFixed(
      2
    )} %, in progress 🟨${inProgressPercent.toFixed(
      2
    )} %, in review 🟩${inReviewPercent.toFixed(2)} %`;
  }
}
