import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargoEquiposComponent } from './descargo-equipos.component';

describe('DescargoEquiposComponent', () => {
  let component: DescargoEquiposComponent;
  let fixture: ComponentFixture<DescargoEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescargoEquiposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescargoEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
