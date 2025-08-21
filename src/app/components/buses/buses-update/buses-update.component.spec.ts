import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusesUpdateComponent } from './buses-update.component';

describe('BusesUpdateComponent', () => {
  let component: BusesUpdateComponent;
  let fixture: ComponentFixture<BusesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusesUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
