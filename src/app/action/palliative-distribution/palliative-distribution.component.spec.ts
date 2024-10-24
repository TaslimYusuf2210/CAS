import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalliativeDistributionComponent } from './palliative-distribution.component';

describe('PalliativeDistributionComponent', () => {
  let component: PalliativeDistributionComponent;
  let fixture: ComponentFixture<PalliativeDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalliativeDistributionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalliativeDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
