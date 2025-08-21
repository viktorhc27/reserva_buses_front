import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasCreateComponent } from './rutas-create.component';

describe('RutasCreateComponent', () => {
  let component: RutasCreateComponent;
  let fixture: ComponentFixture<RutasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutasCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
