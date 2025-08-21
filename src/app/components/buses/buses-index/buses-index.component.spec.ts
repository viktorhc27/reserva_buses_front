import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusesIndexComponent } from './buses-index.component';

describe('BusesIndexComponent', () => {
  let component: BusesIndexComponent;
  let fixture: ComponentFixture<BusesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusesIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
