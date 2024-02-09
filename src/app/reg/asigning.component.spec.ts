import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsigningComponent } from './asigning.component';

describe('AsigningComponent', () => {
  let component: AsigningComponent;
  let fixture: ComponentFixture<AsigningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsigningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
