import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionUsuariosComponent } from './asignacion-usuarios.component';

describe('AsignacionUsuariosComponent', () => {
  let component: AsignacionUsuariosComponent;
  let fixture: ComponentFixture<AsignacionUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
