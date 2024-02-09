import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponiblesComponent } from './disponibles.component';

describe('DisponiblesComponent', () => {
  let component: DisponiblesComponent;
  let fixture: ComponentFixture<DisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisponiblesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
