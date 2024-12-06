import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetRecordModalComponent } from './budget-record-modal.component';

describe('BudgetRecordModalComponent', () => {
  let component: BudgetRecordModalComponent;
  let fixture: ComponentFixture<BudgetRecordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetRecordModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetRecordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
