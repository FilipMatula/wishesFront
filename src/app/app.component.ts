import { Component, OnInit } from '@angular/core';
import { ViewType, Wish } from './types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, finalize, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading: boolean = false;

  constructor(private httpClient: HttpClient, private messageService: MessageService){}

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
    this.loading = true;
    this.httpClient.get<Wish[]>(`${environment.apiUrl}/Wishes`).pipe(tap((data: Wish[]) => {
      this.wishes = data;
    }),catchError((error: HttpErrorResponse): Observable<never> => {
      this.messageService.add({
        severity: 'error',
        summary: "Błąd",
        detail: error.error ? error.error.title ?? 'Wystąpił nieznany błąd :(' : 'Wystąpił nieznany błąd :(',
        life: 5000,
      })
      throw error;
    }),
    finalize(() => this.loading = false),
    ).subscribe();
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
    this.loading = true;
    this.httpClient.post<void>(`${environment.apiUrl}/Wishes`, this.newWish).pipe(
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: "Sukces",
          detail: 'Dziękujemy! :)',
          life: 5000,
          sticky: true
        })
      }),
      catchError((error: HttpErrorResponse): Observable<never> => {
      this.messageService.add({
        severity: 'error',
        summary: "Błąd",
        detail: error.error ? error.error.title ?? 'Wystąpił nieznany błąd :(' : 'Wystąpił nieznany błąd :(',
        life: 5000,
        sticky: true
      })
      throw error;
    }),
    finalize(() => this.loading = false),
    ).subscribe(() => {
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
