import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mr1Component } from './mr1.component';

describe('Mr1Component', () => {
  let component: Mr1Component;
  let fixture: ComponentFixture<Mr1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mr1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Mr1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
