import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignsComponent } from './asigns.component';

describe('AsignsComponent', () => {
  let component: AsignsComponent;
  let fixture: ComponentFixture<AsignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
