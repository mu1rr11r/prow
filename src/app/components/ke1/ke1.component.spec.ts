import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ke1Component } from './ke1.component';

describe('Ke1Component', () => {
  let component: Ke1Component;
  let fixture: ComponentFixture<Ke1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ke1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Ke1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
