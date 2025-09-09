import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaUpdateComponent } from './reserva-update.component';

describe('ReservaUpdateComponent', () => {
  let component: ReservaUpdateComponent;
  let fixture: ComponentFixture<ReservaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
