import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsSelectorDialogComponent } from './columns-selector-dialog.component';

describe('ColumnsSelectorDialogComponent', () => {
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
});
