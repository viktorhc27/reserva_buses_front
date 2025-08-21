import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasIndexComponent } from './rutas-index.component';

describe('RutasIndexComponent', () => {
  let component: RutasIndexComponent;
  let fixture: ComponentFixture<RutasIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutasIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutasIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
