import { Component, OnInit } from '@angular/core';
import { ViewType, Wish } from './types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    this.newWish = {
      signature: '',
      wishText: '',
      base64Content: null
    }

    this.fetchWishes();
  }

  currentPage: ViewType = "Add";
  newWish: Wish;
  submitted: boolean = false;
  wishes: Wish[] = [];

  private fetchWishes(): void {
    this.httpClient.get<Wish[]>(`${environment.apiUrl}/Wishes`).pipe(tap((data: Wish[]) => {
      this.wishes = data;
    })).subscribe();
  }

  public goTo(type: ViewType): void {
    this.currentPage = type;
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  public clear(): void {
    this.newWish.wishText = '';
    this.newWish.signature = '';
    this.newWish.base64Content = null;
    this.submitted = false;
  }

  public preview(): void {
    this.submitted = true;
    if (this.newWish.wishText !== '' && this.newWish.signature !== '') {
      this.goTo('Preview');
    }
  }

  public send(): void {
    this.httpClient.post<void>(`${environment.apiUrl}/Wishes`, this.newWish).subscribe(() => {
      this.fetchWishes();

      this.clear();
      this.goTo('ViewAll');
    });
  }

  public onSelectFile(event: any): void {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.newWish.base64Content = (<FileReader>event.target).result;
      }
    }
  }
}
