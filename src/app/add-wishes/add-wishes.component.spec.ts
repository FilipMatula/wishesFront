import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWishesComponent } from './add-wishes.component';

describe('AddWishesComponent', () => {
  let component: AddWishesComponent;
  let fixture: ComponentFixture<AddWishesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWishesComponent]
    });
    fixture = TestBed.createComponent(AddWishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
