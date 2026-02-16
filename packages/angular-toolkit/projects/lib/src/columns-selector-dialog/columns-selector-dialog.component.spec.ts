import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnsSelectorDialogComponent , GenericTableData } from './columns-selector-dialog.component';
import { page } from "vitest/browser";


const DEFAULT_COLUMNS: GenericTableData[] = [
  { field: "firstName", name: "First name"},
  { field: "lastNameName", name: "Last name"},
  { field: "dateOfBirth", name: "Date of birth"},
  { field: "age", name: "Age"},
]
const MOCK_SAVED_PREFERENCES: GenericTableData[] = [
  { field: "firstName", header: "First name"},
  { field: "lastNameName", header: "Last name"},
  { field: "dateOfBirth", name: "Date of birth"},
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

  //DONE
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //DONE
  it('visibleColumns should equal columns if there is no saved preferences', () => {
    expect(component.visibleColumns()).toEqual(component.columns());
  });

  //DONE. USE THIS AS AN EXAMPLE
  it('modal should close after cancel', async () => {

    // Check the modal is open
    await expect(page.getByRole("dialog")).toBeInTheDocument();
    // Click the cancel button
    await page.getByRole("button", {name: "Cancel"}).click();
    // Check the modal is closed
    await expect(page.getByRole("dialog")).not.toBeInTheDocument();
    // Check the visible flag is correctly updated
    expect(component.visible()).toBeFalsy();
  });

  //DONE.
  it('no changes made, save should not change visibleColumns and modal should close', async () => {

    // Make a copy of visibleColumns before save
    let visibleColumnsBeforeSave = structuredClone(component.visibleColumns());

    // Click the save button
    await page.getByRole("button", {name: "Save"}).click();

    // visibleColumns is the same before and after save
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeSave);

    // check the modal disapears after save
    await expect(page.getByRole("dialog")).not.toBeInTheDocument();

    // check the visible flag is correctly updated after save
    expect(component.visible()).toBeFalsy();
  });

  it('changes made, reset makes _visibleColumns reset to columns', async () => {    
    
    // Drag 'First name' into the hidden columns. NOT WORKING. TARGET IS NOT SHOWING UP I THINK
    await page.getByRole("option", {name: "First name"}).dropTo(page.getByRole("listbox", {name: "Target"}));

    // Ensure drag and drop worked. 'First name' should be in Target
    expect(page.getByRole("listbox", {name: "Target"}).getByRole("option")).toHaveTextContent("First Name");
    expect(page.getByRole("listbox", {name: "Source"}).getByRole("option")).not.toHaveTextContent("First Name");

    // Click reset.
    await page.getByRole("button", {name: "Reset to default"}).click();

    // First name should be in Source and not target
    expect(page.getByRole("listbox", {name: "Source"}).getByRole("option")).toHaveTextContent("First Name");
    expect(page.getByRole("listbox", {name: "Target"}).getByRole("option")).not.toHaveTextContent("First Name");

  });

  it('changes made, cancel, changes should not be applied', async () => {

    const visibleColumnsLengthBefore = component.visibleColumns().length;

    // DRAG/DROP
    // TODO: Drag first name from source to target

    await page.getByRole("button", {name: "Cancel"}).click();

    // Check somehow that visibleColumns hasn't changed. Maybe the length?
    // TODO: Does visibleColumnsLengthBefore update?
    expect(visibleColumnsLengthBefore).toEqual(component.visibleColumns().length);
  });

  it('changes made, save, changes should be applied', async () => {

    const visibleColumnsLengthBefore = component.visibleColumns().length; 

    //TODO: DRAG/DROP

    await page.getByRole("button", {name: "Save"}).click();

    /** visibleColumns should change after save. */
    expect(visibleColumnsLengthBefore).not.toEqual(component.visibleColumns().length);
  });


  it('duplicate bug when moving elements', async () => {

    // Select one element from source list

    // Drop it in target list

    // Then using ctrl (or turn off metaKeySelection in HTML), select two elements from source list

    // Drop both elements in target list

    // The first element in target list should now be duplicated


    // ADDITIONAL CASE:

    // Select one element from source list, drop in target list

    // Select another element in source list (ensure you highlight it, click on it once to highlight, and then again to drag, or hold ctrl on the first click)

    // Drag second element over. First element will be duplicated

    
    // Both of these cases are repeatable in both the dev environment and on the primeng component page.
  });

  
});


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

  it('empty columns loaded, modal still opens and can be closed', () => {

    expect(component.visible()).toBeTruthy();    
    expect(component.visibleColumns()).toEqual([]);
    (component as any)['handleCancel']();
    expect(component.visible()).toBeFalsy();
  });

  it('empty columns loaded, save', () => {

    expect(component.visibleColumns()).toEqual([]);
    (component as any)['handleSave']();
    expect(component.visible()).toBeFalsy();
  });

});

