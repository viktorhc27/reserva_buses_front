import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaIndexComponent } from './reserva-index.component';

describe('ReservaIndexComponent', () => {
  let component: ReservaIndexComponent;
  let fixture: ComponentFixture<ReservaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
