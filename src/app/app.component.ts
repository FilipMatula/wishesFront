import { Component, OnInit } from '@angular/core';
import { ViewType, Wish } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.newWish = {
      signature: '',
      wishes: '',
      url: null
    }
  }

  currentPage: ViewType = "Add";
  newWish: Wish;
  submitted: boolean = false;
  wishes: Wish[] = [];

  public goTo(type: ViewType): void {
    this.currentPage = type;
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  public clear(): void {
    this.newWish.wishes = '';
    this.newWish.signature = '';
    this.newWish.url = null;
    this.submitted = false;
  }

  public preview(): void {
    this.submitted = true;
    if (this.newWish.wishes !== '' && this.newWish.signature !== '') {
      this.goTo('Preview');
    }
  }

  public send(): void {
    this.wishes.push({...this.newWish});
    console.log(this.wishes);
    this.clear();
    this.goTo('ViewAll');
  }

  public onSelectFile(event: any): void {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.newWish.url = (<FileReader>event.target).result;
      }
    }
  }
}
