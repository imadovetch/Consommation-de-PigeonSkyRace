import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ORGANIZERComponent } from './organizer.component';

describe('ORGANIZERComponent', () => {
  let component: ORGANIZERComponent;
  let fixture: ComponentFixture<ORGANIZERComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ORGANIZERComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ORGANIZERComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
