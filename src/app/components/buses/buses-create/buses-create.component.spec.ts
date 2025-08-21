import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusesCreateComponent } from './buses-create.component';

describe('BusesCreateComponent', () => {
  let component: BusesCreateComponent;
  let fixture: ComponentFixture<BusesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
