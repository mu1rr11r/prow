import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutaComponent } from './outa.component';

describe('OutaComponent', () => {
  let component: OutaComponent;
  let fixture: ComponentFixture<OutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
