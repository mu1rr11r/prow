import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavoutComponent } from './navout.component';

describe('NavoutComponent', () => {
  let component: NavoutComponent;
  let fixture: ComponentFixture<NavoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
