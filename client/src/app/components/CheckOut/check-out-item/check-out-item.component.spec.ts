import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutItemComponent } from './check-out-item.component';

describe('CheckOutItemComponent', () => {
  let component: CheckOutItemComponent;
  let fixture: ComponentFixture<CheckOutItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
