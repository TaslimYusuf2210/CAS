import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundDisbursementComponent } from './fund-disbursement.component';

describe('FundDisbursementComponent', () => {
  let component: FundDisbursementComponent;
  let fixture: ComponentFixture<FundDisbursementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundDisbursementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FundDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
