import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ge1Component } from './ge1.component';

describe('Ge1Component', () => {
  let component: Ge1Component;
  let fixture: ComponentFixture<Ge1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ge1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Ge1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
