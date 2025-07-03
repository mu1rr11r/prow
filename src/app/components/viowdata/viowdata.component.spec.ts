import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViowdataComponent } from './viowdata.component';

describe('ViowdataComponent', () => {
  let component: ViowdataComponent;
  let fixture: ComponentFixture<ViowdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViowdataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViowdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
