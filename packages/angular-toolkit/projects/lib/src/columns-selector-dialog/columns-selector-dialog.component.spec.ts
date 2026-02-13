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
    fixture.componentRef.setInput('visibleColumns', DEFAULT_COLUMNS);
    fixture.componentRef.setInput('columns', DEFAULT_COLUMNS);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('visibleColumns should equal columns if there is no saved preferences', () => {
    expect(component.visibleColumns()).toEqual(component.columns());
  });

  it('modal should close after cancel', async () => {
    expect(component.visible()).toBeTruthy();
    await expect(page.getByRole("dialog")).toBeInTheDocument();

    await page.getByRole("button", {name: "cancel"}).click();
    await expect(page.getByRole("dialog")).not.toBeInTheDocument();
    // (component as any)['handleCancel']();
    expect(component.visible()).toBeFalsy();

  });

  it('no changes made, save should not change visibleColumns and modal should close', () => {
    expect(component.visible()).toBeTruthy();
    let visibleColumnsBeforeSave = structuredClone(component.visibleColumns());
    (component as any)['handleSave']();
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeSave);
    expect(component.visible()).toBeFalsy();
  });

  it('no changes made, reset makes _visibleColumns reset to columns', () => {
    (component as any)['handleReset']();
    expect(component.columns()).toEqual((component as any)['_visibleColumns']());
  });

  it('changes made, cancel, changes should not be applied', () => {

    const visibleColumnsBeforeChange = structuredClone(component.visibleColumns());
    const _visibleColumnsBeforeChange = structuredClone((component as any)['_visibleColumns']());
    const hiddenColumnsBeforeChange = structuredClone((component as any)['hiddenColumns']());

    /** Manually move element from _visibleColumns to hiddenColumns to simulate drag/drop. */
    let a:GenericTableData = ((component as any)['_visibleColumns']()).splice(1,1);
    ((component as any)['hiddenColumns']()).push(a);

    /** visibleColumns shouldn't have changed, _visibleColumns and hiddenColumns should have. */
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeChange);
    expect((component as any)['hiddenColumns']()).not.toEqual(hiddenColumnsBeforeChange);
    expect((component as any)['_visibleColumns']()).not.toEqual(_visibleColumnsBeforeChange);

    (component as any)['handleCancel']();

    /** visibleChanges shouldn't have changed after cancel. */
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeChange);

  });

  it('changes made, save, changes should be applied', () => {

    const visibleColumnsBeforeChange = structuredClone(component.visibleColumns());
    const _visibleColumnsBeforeChange = structuredClone((component as any)['_visibleColumns']());
    const hiddenColumnsBeforeChange = structuredClone((component as any)['hiddenColumns']());

    /** Manually move element from _visibleColumns to hiddenColumns to simulate drag/drop. */
    let a:GenericTableData = ((component as any)['_visibleColumns']()).splice(1,1);
    ((component as any)['hiddenColumns']()).push(a);

    /** visibleColumns shouldn't have changed, _visibleColumns and hiddenColumns should have. */
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeChange);
    expect((component as any)['hiddenColumns']()).not.toEqual(hiddenColumnsBeforeChange);
    expect((component as any)['_visibleColumns']()).not.toEqual(_visibleColumnsBeforeChange);

    (component as any)['handleSave']();

    /** visibleColumns should change after save. */
    expect(component.visibleColumns()).not.toEqual(visibleColumnsBeforeChange);
  });

  it('changes made but not saved, reset makes _visibleColumns the same as columns', () => {

    const visibleColumnsBeforeChange = structuredClone(component.visibleColumns());
    const _visibleColumnsBeforeChange = structuredClone((component as any)['_visibleColumns']());
    const hiddenColumnsBeforeChange = structuredClone((component as any)['hiddenColumns']());

    /** Manually move element from _visibleColumns to hiddenColumns to simulate drag/drop. */
    let a:GenericTableData = ((component as any)['_visibleColumns']()).splice(1,1);
    ((component as any)['hiddenColumns']()).push(a);

    /** visibleColumns shouldn't have changed, _visibleColumns and hiddenColumns should have. */
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeChange);
    expect((component as any)['hiddenColumns']()).not.toEqual(hiddenColumnsBeforeChange);
    expect((component as any)['_visibleColumns']()).not.toEqual(_visibleColumnsBeforeChange);

    (component as any)['handleReset']();

    /** _visibleChanges should now equal _visibleChangesBeforeChange,visibleColumns and columns. */
    expect((component as any)['_visibleColumns']()).toEqual(_visibleColumnsBeforeChange);
    expect((component as any)['_visibleColumns']()).toEqual(visibleColumnsBeforeChange);
    expect((component as any)['_visibleColumns']()).toEqual(component.columns());

  });

  it('all columns exist across hiddenColumns and _visibleColumns', () => {

    /** Get the total number of columns, and total between _visibleColumns and hiddenColumns. */
    let totalColumns = (component.columns()).length;
    let sumOfColumnsBeforeChange = amountOfCols(component);

    expect(sumOfColumnsBeforeChange).toEqual(totalColumns);

    /** Make a change. */
    let a:GenericTableData = ((component as any)['_visibleColumns']()).splice(1,1);
    ((component as any)['hiddenColumns']()).push(a);

    /** The sum of the columns in _visibleColumns and hiddenColumns shouldn't have changed. */
    let sumOfColumnsAfterChange = amountOfCols(component);
    expect(sumOfColumnsAfterChange).toEqual(totalColumns);

  });

  it('ensure each column field exists and is in either hiddenColumns or _visibleColumns', () => {

    // TODO: Is this check redundant because of typescript type checking?
    // Check that each column has a `field` field.
    DEFAULT_COLUMNS.forEach(element => {
      expect(element.field).toBeTruthy();
    });

    /** Get all the field names in columns, and in each of _visibleColumns and hiddenColumns. */
    const allColumnNames:Array<string> = DEFAULT_COLUMNS.map(columns => columns.field);
    const _visibleColumnsFields:Array<string> = ((component as any)['_visibleColumns']()).map((columns: { field: any; }) => columns.field);
    const hiddenColumnsFields:Array<string> = ((component as any)['hiddenColumns']()).map((columns: { field: any; }) => columns.field);

    /** Check that each field name in columns exists in either _visibleColumns or hiddenColumns. */
    allColumnNames.forEach(element => {
      expect([..._visibleColumnsFields, ...hiddenColumnsFields]).toContain(element);
    });
  });

  it('Some tests relating to config for different input types', () => {



  });
  
});

describe('ColumnsSelectorDialogComponent tests with saved preferences', async () => {
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

  it('visibleColumns should just be default columns', () => {

    expect(component.visibleColumns()).not.toEqual(component.columns());
  });

  it('modal should close after cancel is hit', () => {
    expect(component.visible()).toBeTruthy();
    (component as any)['handleCancel']();
    expect(component.visible()).toBeFalsy();
  });

  it('no changes made, no change to visibleColumns when saved, and modal should close', () => {
    expect(component.visible()).toBeTruthy();
    let visibleColumnsBeforeSave = structuredClone(component.visibleColumns());
    (component as any)['handleSave']();
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeSave);
    expect(component.visible()).toBeFalsy();
  });

  it('no changes made, reset makes _visibleColumns reset to columns and not visibleColumns', () => {
    (component as any)['handleReset']();
    expect(component.columns()).toEqual((component as any)['_visibleColumns']());
    expect(component.visibleColumns()).not.toEqual((component as any)['_visibleColumns']());
  });

  it('changes made, cancel, changes should not be applied', () => {

    const visibleColumnsBeforeChange = structuredClone(component.visibleColumns());
    const _visibleColumnsBeforeChange = structuredClone((component as any)['_visibleColumns']());
    const hiddenColumnsBeforeChange = structuredClone((component as any)['hiddenColumns']());

    /** Manually move element from _visibleColumns to hiddenColumns to simulate drag/drop. */
    let a:GenericTableData = ((component as any)['_visibleColumns']()).splice(1,1);
    ((component as any)['hiddenColumns']()).push(a);

    /** visibleColumns shouldn't have changed, _visibleColumns and hiddenColumns should have. */ 
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeChange);
    expect((component as any)['hiddenColumns']()).not.toEqual(hiddenColumnsBeforeChange);
    expect((component as any)['_visibleColumns']()).not.toEqual(_visibleColumnsBeforeChange);

    (component as any)['handleCancel']();

    /** visibleChanges shouldn't have changed. */
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeChange);

  });

  it('changes made, save, changes should be applied', () => {

    const visibleColumnsBeforeChange = structuredClone(component.visibleColumns());
    const _visibleColumnsBeforeChange = structuredClone((component as any)['_visibleColumns']());
    const hiddenColumnsBeforeChange = structuredClone((component as any)['hiddenColumns']());

    /** Manually move element from _visibleColumns to hiddenColumns to simulate drag/drop. */
    let a:GenericTableData = ((component as any)['_visibleColumns']()).splice(1,1);
    ((component as any)['hiddenColumns']()).push(a);

    /** visibleColumns shouldn't have changed, _visibleColumns and hiddenColumns should have. */
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeChange);
    expect((component as any)['hiddenColumns']()).not.toEqual(hiddenColumnsBeforeChange);
    expect((component as any)['_visibleColumns']()).not.toEqual(_visibleColumnsBeforeChange);

    (component as any)['handleSave']();

    /** visibleColumns should have changed. */
    expect(component.visibleColumns()).not.toEqual(visibleColumnsBeforeChange);
  });

  it('changes made but not saved, reset makes _visibleColumns the same as columns', () => {

    const visibleColumnsBeforeChange = structuredClone(component.visibleColumns());
    const _visibleColumnsBeforeChange = structuredClone((component as any)['_visibleColumns']());
    const hiddenColumnsBeforeChange = structuredClone((component as any)['hiddenColumns']());

    /** Manually move element from _visibleColumns to hiddenColumns to simulate drag/drop. */
    let a:GenericTableData = ((component as any)['_visibleColumns']()).splice(1,1);
    ((component as any)['hiddenColumns']()).push(a);

    /** visibleColumns shouldn't have changed, _visibleColumns and hiddenColumns should have. */
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeChange);
    expect((component as any)['hiddenColumns']()).not.toEqual(hiddenColumnsBeforeChange);
    expect((component as any)['_visibleColumns']()).not.toEqual(_visibleColumnsBeforeChange);

    (component as any)['handleReset']();

    /**_visibleColumns should not equal _visibleChangesBeforeChange or visibleColumns. */
    expect((component as any)['_visibleColumns']()).not.toEqual(_visibleColumnsBeforeChange);
    expect((component as any)['_visibleColumns']()).not.toEqual(component.visibleColumns());
    expect((component as any)['_visibleColumns']()).toEqual(component.columns());

  });


  //TODO: Test is not working because of issue in hiddenColumns definition.
  it('correct amount of columns exist across hiddenColumns and _visibleColumns', () => {

    /** Get the total number of columns, and total between _visibleColumns and hiddenColumns. */
    let totalColumns = (component.columns()).length;
    let sumOfColumnsBeforeChange = amountOfCols(component);
    console.log(`combined col lenght = ${sumOfColumnsBeforeChange}`)
    console.log(`hidden length = ${((component as any)['hiddenColumns']()).length} and hid = ${((component as any)['hiddenColumns']())}`);

    expect(sumOfColumnsBeforeChange).toEqual(totalColumns);

    /** Make a change. */
    let a:GenericTableData = ((component as any)['_visibleColumns']()).splice(1,1);
    ((component as any)['hiddenColumns']()).push(a);

    /** The sum of the columns in _visibleColumns and hiddenColumns shouldn't have changed. */
    let sumOfColumnsAfterChange = amountOfCols(component);
    expect(sumOfColumnsAfterChange).toEqual(totalColumns);

  });

  it('ensure each column field exists and is in either hiddenColumns or _visibleColumns', () => {

    // TODO: Is this check redundant because of typescript type checking?
    // Check that each column has a `field` field.
    DEFAULT_COLUMNS.forEach(element => {
      expect(element.field).toBeTruthy();
    });

    /** Get all the field names in columns, and in each of _visibleColumns and hiddenColumns. */
    const allColumnNames:Array<string> = DEFAULT_COLUMNS.map(columns => columns.field);
    const _visibleColumnsFields:Array<string> = ((component as any)['_visibleColumns']()).map((columns: { field: any; }) => columns.field);
    const hiddenColumnsFields:Array<string> = ((component as any)['hiddenColumns']()).map((columns: { field: any; }) => columns.field);

    /** Check that each field name in columns exists in either _visibleColumns or hiddenColumns. */
    allColumnNames.forEach(element => {
      expect([..._visibleColumnsFields, ...hiddenColumnsFields]).toContain(element);
    });
  });

  // TODO
  it('Some tests relating to config for different input types', () => {

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



function amountOfCols(component: ColumnsSelectorDialogComponent):number {
  console.log(`_vis length = ${((component as any)['_visibleColumns']()).length} and _vis = ${((component as any)['_visibleColumns']())}`);
  console.log(`hidden length = ${((component as any)['hiddenColumns']()).length} and hid = ${((component as any)['hiddenColumns']())}`);
  let sumOfColumns:number = ((component as any)['_visibleColumns']()).length + 
      ((component as any)['hiddenColumns']()).length
  return sumOfColumns;
}


