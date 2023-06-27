import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-wish-card',
  templateUrl: './wish-card.component.html',
  styleUrls: ['./wish-card.component.scss']
})
export class WishCardComponent {
  @Input() base64Content: any;
  @Input() wishes: string = '';
  @Input() signature: string = '';

  @ViewChild('div') card: ElementRef;

  public getElement(): ElementRef {
    return this.card;
  }
}
