import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargoEquiposBnComponent } from './descargo-equipos-bn.component';

describe('DescargoEquiposBnComponent', () => {
  let component: DescargoEquiposBnComponent;
  let fixture: ComponentFixture<DescargoEquiposBnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescargoEquiposBnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescargoEquiposBnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
