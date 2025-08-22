import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioViewComponent } from './horario-view.component';

describe('HorarioViewComponent', () => {
  let component: HorarioViewComponent;
  let fixture: ComponentFixture<HorarioViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
