import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusesViewComponent } from './buses-view.component';

describe('BusesViewComponent', () => {
  let component: BusesViewComponent;
  let fixture: ComponentFixture<BusesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
