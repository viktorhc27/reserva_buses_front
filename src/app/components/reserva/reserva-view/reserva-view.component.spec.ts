import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaViewComponent } from './reserva-view.component';

describe('ReservaViewComponent', () => {
  let component: ReservaViewComponent;
  let fixture: ComponentFixture<ReservaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
