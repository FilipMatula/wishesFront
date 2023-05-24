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
  url: any = null;
  submitted: boolean = false;

  public goTo(type: ViewType): void {
    this.currentPage = type;
    console.log(this.currentPage);
  }

  public clear(): void {
    this.wishes = '';
    this.signature = '';
  }

  public preview(): void {
    this.submitted = true;
    if (this.wishes !== '' && this.signature !== '') {
      this.goTo('Preview');
    }
  }

  public send(): void {

  }

  public onSelectFile(event: any): void {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }
}
