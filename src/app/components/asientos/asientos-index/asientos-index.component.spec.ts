import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientosIndexComponent } from './asientos-index.component';

describe('AsientosIndexComponent', () => {
  let component: AsientosIndexComponent;
  let fixture: ComponentFixture<AsientosIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsientosIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsientosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
