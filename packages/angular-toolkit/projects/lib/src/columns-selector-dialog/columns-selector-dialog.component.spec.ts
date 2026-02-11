import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsSelectorDialogComponent } from './columns-selector-dialog.component';

describe('ColumnsSelectorDialogComponent Tests', () => {
  let component: ColumnsSelectorDialogComponent;
  let fixture: ComponentFixture<ColumnsSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnsSelectorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnsSelectorDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Component opens correctly, has all columns in visible to start

  // Test moving column to hidden, save. Should update visibleColumns

  // Test moving column to hidden, cancelling. Should not update visibleColumns

  // Moving column to hidden, saving, reopening, column should still be in hidden

  // Using reset without save, should return all columns to visible

  // Using reset after save, should return all columns to visible

  // Edge cases where no columns exist

  // Edge case where all columns are in hidden, component shouldn't break

  // Test for loading columns correctly

  // Test for displaying the correct column info, eg `field`

  // Test output format is correct.

  // Cancel/closing work correctly, don't have any impact on the data
  
  // Check for duplicate highlighting bug

  // All columns appear in at least and at most 1 list.
});
