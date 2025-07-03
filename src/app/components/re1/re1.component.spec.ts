import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RE1Component } from './re1.component';

describe('RE1Component', () => {
  let component: RE1Component;
  let fixture: ComponentFixture<RE1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RE1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RE1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
