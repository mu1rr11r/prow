import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeshbordeComponent } from './deshborde.component';

describe('DeshbordeComponent', () => {
  let component: DeshbordeComponent;
  let fixture: ComponentFixture<DeshbordeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeshbordeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeshbordeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
