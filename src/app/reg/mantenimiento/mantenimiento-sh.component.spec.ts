import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoSHComponent } from './mantenimiento-sh.component';

describe('MantenimientoSHComponent', () => {
  let component: MantenimientoSHComponent;
  let fixture: ComponentFixture<MantenimientoSHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MantenimientoSHComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MantenimientoSHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
