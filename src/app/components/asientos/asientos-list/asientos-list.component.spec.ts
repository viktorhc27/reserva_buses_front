import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientosListComponent } from './asientos-list.component';

describe('AsientosListComponent', () => {
  let component: AsientosListComponent;
  let fixture: ComponentFixture<AsientosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsientosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsientosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
