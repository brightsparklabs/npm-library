/*
 * Created by brightSPARK Labs
 * www.brightsparklabs.com
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnsSelectorDialogComponent , GenericTableData } from './columns-selector-dialog.component';
import { page } from "vitest/browser";


/** 
 * Test data to populate the dialog.
 * With this data, 'First name', 'Last name' and 'Date of birth' should appear in _visibleColumns
 * and 'Age' should appear in hiddenColumns. 
 * 
 * TODO: This is not how the data is loading.
 * I believe this is an issue with the hiddenColumns linkedSignal logic.
 */
const DEFAULT_COLUMNS: GenericTableData[] = [
  { label: "First name"},
  { label: "Last name"},
  { label: "Date of birth"},
  { label: "Age"},
]
const MOCK_SAVED_PREFERENCES: GenericTableData[] = [
  { label: "First name"},
  { label: "Last name"},
  { label: "Date of birth"},
]

describe('ColumnsSelectorDialogComponent tests with no saved preferences', async () => {
  let component: ColumnsSelectorDialogComponent;
  let fixture: ComponentFixture<ColumnsSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ColumnsSelectorDialogComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnsSelectorDialogComponent);

    /** Set the values of the component. */
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('visibleColumns', MOCK_SAVED_PREFERENCES);
    fixture.componentRef.setInput('columns', DEFAULT_COLUMNS);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('visibleColumns should not equal columns', () => {
    expect(component.visibleColumns()).not.toEqual(component.columns());
  });

  it('dialog should be open, and close after cancel', async () => {
    await expect(page.getByRole("dialog")).toBeInTheDocument();
    await page.getByRole("button", {name: "Cancel"}).click();
    await expect(page.getByRole("dialog")).not.toBeInTheDocument();
    expect(component.visible()).toBeFalsy();
  });

  it('no changes made, save should not change visibleColumns and modal should close', async () => {

    // Make a copy of visibleColumns before save
    let visibleColumnsBeforeSave = structuredClone(component.visibleColumns());
    await page.getByRole("button", {name: "Save"}).click();

    // visibleColumns is the same before and after save
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeSave);

    // check the modal disapears after save
    await expect(page.getByRole("dialog")).not.toBeInTheDocument();

    // check the visible flag is correctly updated after save
    expect(component.visible()).toBeFalsy();
  });

  //TODO: Fix this test and all those following that involve drag/drop.
  it('changes made, reset makes _visibleColumns reset to columns', async () => {    

    // The 'Target' listbox never becomes visible. 
    await page.getByRole("option", {name: "First name"})
      .dropTo(page.getByRole("listbox", {name: "Target"}));

    // Ensure drag and drop worked. 'First name' should be in Target
    expect(page.getByRole("listbox", {name: "Target"})
      .getByRole("option"))
      .toHaveTextContent("First Name");
    expect(page.getByRole("listbox", {name: "Source"})
      .getByRole("option"))
      .not.toHaveTextContent("First Name");

    await page.getByRole("button", {name: "Reset to default"}).click();

    // First name should be in Source and not target
    expect(page.getByRole("listbox", {name: "Source"})
      .getByRole("option"))
      .toHaveTextContent("First Name");
    expect(page.getByRole("listbox", {name: "Target"})
      .getByRole("option"))
      .not.toHaveTextContent("First Name");
  });

  //TODO: Fix when drag/drop is working.
  it('changes made, cancel, changes should not be applied', async () => {

    // First name is in source.
    expect(page.getByRole("listbox", {name: "Source"})
      .getByRole("option"))
      .toHaveTextContent("First Name");

    //TODO: Insert working .dropTo here. Drag first name from source to target

    await page.getByRole("button", {name: "Cancel"}).click();

    // First name is still in source after cancel.
    expect(page.getByRole("listbox", {name: "Source"})
      .getByRole("option"))
      .toHaveTextContent("First Name");
  });

  it('changes made, save, changes should be applied', async () => {

    //TODO: Insert working .dropTo here. Drag first name from source to target

    await page.getByRole("button", {name: "Save"}).click();

    // Reopen dialog.
    fixture.componentRef.setInput('visible', true);
    await expect(page.getByRole("dialog")).toBeInTheDocument();

    // First name should be in hidden.
    expect(page.getByRole("listbox", {name: "Target"})
      .getByRole("option"))
      .toHaveTextContent("First Name"); 
  });


  it('duplicate bug when moving elements', async () => {

    // Duplicate bug. Refer to BNL-26 Ticket for additional details.

    /**
     * Bug is with the actual Primeng picklist component.
     * 
     * Instructions to replicate.
     * 1. Highlight an element from source list, and drag it in the target list.
     * 2. Then highlight another element in the source list, and drag it to the target list.
     *    The first element moved should now appear twice in target list.
     */

  });

  
});

/**
 * Edge case tests, revolving around the dialog receiving empty lists of columns and visibleColumns.
 */
describe('ColumnsSelectorDialogComponent edge cases', async () => {
  let component: ColumnsSelectorDialogComponent;
  let fixture: ComponentFixture<ColumnsSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ColumnsSelectorDialogComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnsSelectorDialogComponent);

    /** Set the values of the component. Don't pass any columns in. */
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('visibleColumns', []);
    fixture.componentRef.setInput('columns', []);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('empty columns loaded, modal still opens and can be closed', async () => {
    expect(component.visible()).toBeTruthy();    
    expect(component.visibleColumns()).toEqual([]);
    await page.getByRole("button", {name: "Cancel"}).click();
    expect(component.visible()).toBeFalsy();
  });

  it('empty columns loaded, save', async () => {
    expect(component.visibleColumns()).toEqual([]);
    await page.getByRole("button", {name: "Save"}).click();
    expect(component.visible()).toBeFalsy();
  });
});

