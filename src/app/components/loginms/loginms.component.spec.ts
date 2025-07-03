import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginmsComponent } from './loginms.component';

describe('LoginmsComponent', () => {
  let component: LoginmsComponent;
  let fixture: ComponentFixture<LoginmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginmsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
