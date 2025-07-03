import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ke3Component } from './ke3.component';

describe('Ke3Component', () => {
  let component: Ke3Component;
  let fixture: ComponentFixture<Ke3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ke3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Ke3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
