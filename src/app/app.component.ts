import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ViewType, Wish } from './types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, finalize, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import html2canvas from 'html2canvas';
import { WishCardComponent } from './wish-card/wish-card/wish-card.component';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading: boolean = false;

  @ViewChildren('wishCard') wishCards: QueryList<WishCardComponent>;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

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

  public download(): void {
    console.log(this.wishCards);
    this.wishCards.forEach((wishCard: WishCardComponent) => {

      htmlToImage.toPng(wishCard.getElement().nativeElement, {})
      .then((dataUrl) => {
        this.canvas.nativeElement.src = dataUrl;
        this.downloadLink.nativeElement.href = dataUrl;
        this.downloadLink.nativeElement.download = wishCard.signature;
        this.downloadLink.nativeElement.click();
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });

  //     html2canvas(wishCard.getElement().nativeElement, {useCORS: true, allowTaint : true}).then(canvas => {
  //       this.canvas.nativeElement.src = canvas.toDataURL();
  //       this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
  //       this.downloadLink.nativeElement.download = 'marble-diagram.png';
  //       this.downloadLink.nativeElement.click();
  // });
    });

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
