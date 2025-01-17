import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PigeonToCompetitionComponent } from './pigeon-to-competition.component';

describe('PigeonToCompetitionComponent', () => {
  let component: PigeonToCompetitionComponent;
  let fixture: ComponentFixture<PigeonToCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PigeonToCompetitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PigeonToCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
