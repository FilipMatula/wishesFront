import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wish-card',
  templateUrl: './wish-card.component.html',
  styleUrls: ['./wish-card.component.scss']
})
export class WishCardComponent {
  @Input() src: any;
  @Input() wishes: string = '';
  @Input() signature: string = '';
}
