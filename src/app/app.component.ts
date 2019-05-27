import { Component, EventEmitter, Input, Output } from '@angular/core';
export class Hero {
  constructor(
    name: string,
    age: number
  ) { }
}

@Component({
  selector: 'app-custom-counter',
  template: `
    <button (click)="decrement()">-</button>
    <span>{{counter}}</span>
    <button (click)="increment()">+</button>
  `
})
export class CustomCounterComponent {
  counterValue = 0;
    // The next thing we need to do, is to introduce an @Output() event with the same name,
  // plus the Change suffix. We want to emit that event, whenever the value of the counter property changes.
  // Let’s add an @Output() property and emit the latest value in the setter interceptor:
  @Output() counterChange = new EventEmitter();
  // It has an internal counter property that is used to display the current counter value.
  // In order to make this property two-way data bound, the first thing we have to do is to make it an Input property.
  // Let’s add the @Input() decorator:
  @Input()
  get counter() {
    return this.counterValue;
  }
  set counter(val) {
    this.counterValue = val;
    this.counterChange.emit(this.counterValue);
  }
  decrement() {
    this.counter--;
  }

  increment() {
    this.counter++;
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  levelNum: number;
  levels: Array<any> = [
      {num: 0, name: 'AA'},
      {num: 1, name: 'BB'}
  ];
  selectedLevel = this.levels[0];

  selectedLevelCustomCompare = {num: 1, name: "BB"}

  counterValue = 12;
  username = 'James';

  deleteRequest = new EventEmitter<Hero>();
  isValid = false;
  imageUrl = 'https://pbs.twimg.com/profile_images/453761109493702657/KBz7Zs-0_400x400.jpeg';
  isImportant = false;
  isActive = true;
  isSaved = true;
  name = '';
  isSpecial = true;
  canSave = true;
  title = 'Tour of Heroes';
  myHero = 'Windstorm';
  temp = ` <button (click)="delete()">Delete</button>`;
  temp2 = `<hero-detail (deleteRequest)="deleteHero($event)" [hero]="currentHero"></hero-detail>`;
  temp3 = `當 delete() 執行，會觸發 deleteRequest 產生的 EvevntEmitter 物件製造出 Hero ，接者 <hero-detail> 會跟著 deleteRequest 事件觸發的改變而改變`;
  hero = new Hero('James', 123);
  myClasses = {
    important: this.isImportant,
    inactive: !this.isActive,
    saved: this.isSaved,
    long: this.name.length > 6
  };

  setMyClasses() {
    const classes = {
      important: this.isImportant,
      inactive: !this.isActive,
      saved: this.isSaved,
      long: this.name.length > 6
    };
    return classes;
  }
  onSave(): void {
    if (confirm('Are you sure to delete ')) {
      console.log('Implement delete functionality here');
    }
  }


  delete() {

    this.deleteRequest.emit(this.hero);
  }

  // NgModel select
  toNumber(){
    this.levelNum = +this.levelNum;
    console.log(this.levelNum);
  }

  compareFn(a, b) {
    console.log(a, b, a && b && a.num == b.num);
    return a && b && a.num == b.num;
  }
}
