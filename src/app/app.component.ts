import { Component } from '@angular/core';
import { ViewType } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentPage: ViewType = "Add";
  wishes: string = '';
  signature: string = '';

  public goTo(type: ViewType): void {
    this.currentPage = type;
    console.log(this.currentPage);
  }
}
