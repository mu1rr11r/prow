import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ke2Component } from './ke2.component';

describe('Ke2Component', () => {
  let component: Ke2Component;
  let fixture: ComponentFixture<Ke2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ke2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Ke2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
