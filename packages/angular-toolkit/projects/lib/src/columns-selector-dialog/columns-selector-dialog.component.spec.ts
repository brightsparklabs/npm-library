import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnsSelectorDialogComponent } from './columns-selector-dialog.component';

const DEFAULT_COLUMNS = [
  { field: "firstName", header: "First name", width: "10rem" },
  { field: "lastNameName", header: "Last name", width: "10rem" },
  { field: "dateOfBirth", header: "Date of birth", width: "10rem" },
]

describe('ColumnsSelectorDialogComponent Regular Tests', async () => {
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

  it('visibleColumns should just be default columns', () => {
    expect(component.visibleColumns()).toEqual(component.columns());
  });

  it('component should close after cancel is hit', () => {

    // Ensure component is open.
    expect(component.visible()).toBeTruthy();

    // Call the cancel function.
    (component as any)['handleCancel']();

    // Ensure component is closed.
    expect(component.visible()).toBeFalsy();
  });

  it('no changes made, visibleColumns should not change when saved', () => {
    // Ensure component is open.
    expect(component.visible()).toBeTruthy();

    let temp = component.visibleColumns();
    (component as any)['handleSave']();

    // visibleColumns should be equal the same thing it was before saving.
    expect(component.visibleColumns()).toEqual(temp);
    
  });

  it('no changes made, component should not be visible after save', () => {
    expect(component.visible()).toBeTruthy();
    (component as any)['handleSave']();
    expect(component.visible()).toBeFalsy();
  });

  it('changes made, cancel hit, changes should not be applied', () => {

    // Component is open
    expect(component.visible()).toBeTruthy();
    // Get the preferences before doing anything
    let temp = component.visibleColumns();

    // TODO: Figure out how to simulate dragging and dropping. Need to move from _visibleColumns
    // to hiddenColumns or other way around

    // Expect _visibleColumns and hiddenColumns to be changed
    // Save the temphiddenColumns

    // Cancel button
    (component as any)['handleCancel']();

    // Expect hiddenColumns != tempHiddenColumns

    // Expect visibleColumns == temp

  });

  it('changes made, save hit, changes should be applied', () => {
    
    // Component is open
    expect(component.visible()).toBeTruthy();

    // Get preferences before save
    let temp = component.visibleColumns();

    // Make some change to the columns

    (component as any)['handleSave']();

    // Expect temp != visibleColumns
  });

  it('changes made, save hit, modal closed and opened, visibleColumns should be correct', () => {

    //Component open

    //Make some change to the columns, put a field in hidden

    //Get temp variable of _visibleColumns

    //Save changes

    //Reopen the modal, _visibleColumns should equal the temp var tempvariableColumns
  })


  it('no changes made, reset makes _visibleColumns reset to columns', () => {

    //Component open
    expect(component.visible()).toBeTruthy();

    //handleReset
    (component as any)['handleReset']();

    // TODO: Figure out how to get [object Object] as the actual values.
    let tempVisibleColumns = (component as any)['_visibleColumns']();
    console.log(`_visibleColumns = ${tempVisibleColumns}`);

    //_visibleColumns == visibleColumns
    expect(component.visibleColumns()).toEqual(tempVisibleColumns);

  });

  it('changes made but not saved, reset makes _visibleColumns the same as columns', () => {

    //Component open

    //Make a change, move something to hiddenColumns

    //handleReset

    //_visibleColumns == visibleColumns

  });

  it('changes made and saved, reset and save, visibleColumns the same as columns', () => {

    // Component open

    //Make a change, move something to hidden Columns

    //handleSave 

    //handleReset - _visibleColumns should equal columns

    //handleSave - visibleColumns should equal columns
  });
  it('edge case, all columns moved to hiddenColumns. Behaves correctly', () => {

    // Move all columns to hiddenColumns

    // Open component, should open

  })

  it('correct amount of columns exist across hidden and _visible', () => {

    // Ensure component is visible
    expect(component.visible()).toBeTruthy();

    // let colsTotal = colsLength.length
    let colsTotal = (component.columns()).length;


    // expect length(_visibleColumns) + length(hiddenColumns) == colsTotal
    expect(
      ((component as any)['_visibleColumns']()).length + 
      ((component as any)['hiddenColumns']()).length
    ).toEqual(colsTotal);
    // Make some changes, and run
    //      expect length(_visibleColumns) + length(hiddenColumns) == colsTotal
    // after each change

  })

  it('changes made and saved, ensure hidden columns load correctly', () => {

    //Open component

    //Move column/s to hidden

    // temp = hiddenColumns

    // handleSave

    //Open component

    // hiddenColumns == temp
  })

  it('expect column names to exist', () => {

  });

  it('Ensure each column name is in either hidden or _visible', () => {

  });

  it('Some tests relating to config for different input types', () => {



  });
  
});

describe('ColumnsSelectorDialogComponent Bad Inputs Tests', async () => {
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

  it('edge case, empty columns loaded, cancel', () => {

    // Open component - should still open but display nothing
    expect(component.visible()).toBeTruthy();
    
    // visibleColumns is empty
    expect(component.visibleColumns()).toEqual([]);

    // Cancel
    (component as any)['handleCancel']();

    // Component should not be visible
    expect(component.visible()).toBeFalsy();
  });

  it('edge case, empty columns loaded, save', () => {

    // Open component - should still open but display nothing
    expect(component.visible()).toBeTruthy();
    
    // visibleColumns is empty
    expect(component.visibleColumns()).toEqual([]);

    // Save
    (component as any)['handleSave']();

    // Component should not be visible
    expect(component.visible()).toBeFalsy();
  });

});


