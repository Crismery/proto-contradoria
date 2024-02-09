import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargoEquiposParcialComponent } from './descargo-equipos-parcial.component';

describe('DescargoEquiposParcialComponent', () => {
  let component: DescargoEquiposParcialComponent;
  let fixture: ComponentFixture<DescargoEquiposParcialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescargoEquiposParcialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescargoEquiposParcialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
