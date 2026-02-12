import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnsSelectorDialogComponent , TableColumn } from './columns-selector-dialog.component';

const DEFAULT_COLUMNS: TableColumn[] = [
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

  //DONE
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //DONE
  it('visibleColumns should just be default columns', () => {
    expect(component.visibleColumns()).toEqual(component.columns());
  });

  //DONE
  it('component should close after cancel is hit', () => {
    expect(component.visible()).toBeTruthy();
    (component as any)['handleCancel']();
    expect(component.visible()).toBeFalsy();
  });

  //DONE
  it('no changes made, visibleColumns should not change when saved', () => {
    expect(component.visible()).toBeTruthy();
    let temp = component.visibleColumns();
    (component as any)['handleSave']();
    expect(component.visibleColumns()).toEqual(temp);
  });

  //DONE
  it('no changes made, component should not be visible after save', () => {
    expect(component.visible()).toBeTruthy();
    (component as any)['handleSave']();
    expect(component.visible()).toBeFalsy();
  });

  //DONE / TODO
  it('no changes made, reset makes _visibleColumns reset to visibleColumns', () => {
    expect(component.visible()).toBeTruthy();
    (component as any)['handleReset']();
    // TODO: Figure out how to get [object Object] as the actual values.
    expect(component.visibleColumns()).toEqual((component as any)['_visibleColumns']());
  });

//--------------------------------------------------------------------------------------------------
/** All tests after involve making some change to the columns */
//--------------------------------------------------------------------------------------------------

  //DONE  
  it('changes made, cancel hit, changes should not be applied', () => {

    // Component is open
    expect(component.visible()).toBeTruthy();

    const visibleColumnsBeforeChange = structuredClone(component.visibleColumns());
    const _visibleColumnsBeforeChange = structuredClone((component as any)['_visibleColumns']());
    const hiddenBeforeChange = structuredClone((component as any)['hiddenColumns']());

    // Manually take element from _visibleColumns and put in hiddenColumns to simulate drag/drop.
    let a:TableColumn = ((component as any)['_visibleColumns']()).splice(1,1);
    ((component as any)['hiddenColumns']()).push(a);

    // visibleColumns shouldn't have changed
    // _visibleColumns should have changed
    // hiddenColumns should have changed
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeChange);
    expect((component as any)['hiddenColumns']()).not.toEqual(hiddenBeforeChange);
    expect((component as any)['_visibleColumns']()).not.toEqual(_visibleColumnsBeforeChange);

    // Cancel button
    (component as any)['handleCancel']();
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeChange);
    expect(component.visible()).toBeFalsy();

  });

  //DONE
  it('changes made, save hit, changes should be applied', () => {
    
    // Component is open
    expect(component.visible()).toBeTruthy();

    const visibleColumnsBeforeChange = structuredClone(component.visibleColumns());
    const _visibleColumnsBeforeChange = structuredClone((component as any)['_visibleColumns']());
    const hiddenBeforeChange = structuredClone((component as any)['hiddenColumns']());

    // Manually take element from _visibleColumns and put in hiddenColumns to simulate drag/drop.
    let a:TableColumn = ((component as any)['_visibleColumns']()).splice(1,2);
    ((component as any)['hiddenColumns']()).push(a);

    // visibleColumns shouldn't have changed
    // _visibleColumns should have changed
    // hiddenColumns should have changed
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeChange);
    expect((component as any)['hiddenColumns']()).not.toEqual(hiddenBeforeChange);
    expect((component as any)['_visibleColumns']()).not.toEqual(_visibleColumnsBeforeChange);

    // Save button
    (component as any)['handleSave']();
    // visibleColumns should have changed
    expect(component.visibleColumns()).not.toEqual(visibleColumnsBeforeChange);
    expect(component.visible()).toBeFalsy();
  });

  //DONE
  it('changes made, save hit, modal closed visibleColumns should be correct', () => {

    // Component is open
    expect(component.visible()).toBeTruthy();

    const visibleColumnsBeforeChange = structuredClone(component.visibleColumns());
    const _visibleColumnsBeforeChange = structuredClone((component as any)['_visibleColumns']());
    const hiddenBeforeChange = structuredClone((component as any)['hiddenColumns']());

    // Manually take element from _visibleColumns and put in hiddenColumns to simulate drag/drop.
    let a:TableColumn = ((component as any)['_visibleColumns']()).splice(1,2);
    ((component as any)['hiddenColumns']()).push(a);

    // visibleColumns shouldn't have changed
    // _visibleColumns should have changed
    // hiddenColumns should have changed
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeChange);
    expect((component as any)['hiddenColumns']()).not.toEqual(hiddenBeforeChange);
    expect((component as any)['_visibleColumns']()).not.toEqual(_visibleColumnsBeforeChange);

    const _visibleColumnsAfterChange = structuredClone((component as any)['_visibleColumns']());

    // Save button
    (component as any)['handleSave']();

    // Component is closed
    expect(component.visible()).toBeFalsy();

    // Check that visibleColumns is the same as _visibleColumns was before the modal closed
    expect(component.visibleColumns()).toEqual(_visibleColumnsAfterChange);
  })

  //DONE
  it('changes made but not saved, reset makes _visibleColumns the same as columns', () => {

    // Component is open
    expect(component.visible()).toBeTruthy();

    const visibleColumnsBeforeChange = structuredClone(component.visibleColumns());
    const _visibleColumnsBeforeChange = structuredClone((component as any)['_visibleColumns']());
    const hiddenBeforeChange = structuredClone((component as any)['hiddenColumns']());

    // Manually take element from _visibleColumns and put in hiddenColumns to simulate drag/drop.
    let a:TableColumn = ((component as any)['_visibleColumns']()).splice(1,2);
    ((component as any)['hiddenColumns']()).push(a);

    // visibleColumns shouldn't have changed
    // _visibleColumns should have changed
    // hiddenColumns should have changed
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeChange);
    expect((component as any)['hiddenColumns']()).not.toEqual(hiddenBeforeChange);
    expect((component as any)['_visibleColumns']()).not.toEqual(_visibleColumnsBeforeChange);

    //handleReset
    (component as any)['handleReset']();

    // _visibleChanges should now equal _visibleChangesBeforeChange again.
    // _visibleChanges should equal the saved preferences after reset.
    expect((component as any)['_visibleColumns']()).toEqual(_visibleColumnsBeforeChange);
    expect((component as any)['_visibleColumns']()).toEqual(visibleColumnsBeforeChange);

  });


  //THIS TEST IS NOT WORKING. ISSUE WITH SAVE AND THEN RESETTING. I THINK IT MIGHT BE AN ISSUE
  // WITH REOPENING THE MODAL AFTER SAVING/CANCELLING.
  // I don't think reopening workings properly in this test environment.
  // In practice, when you reopen, it creates a new instance, but here we are using same instance.
  it('changes made and saved, reset and save, visibleColumns the same as columns', () => {

    // Component open
    expect(component.visible()).toBeTruthy();

    //Make a change, move something to hidden Columns
    const visibleColumnsBeforeChange = structuredClone(component.visibleColumns());
    const _visibleColumnsBeforeChange = structuredClone((component as any)['_visibleColumns']());
    const hiddenBeforeChange = structuredClone((component as any)['hiddenColumns']());

    // Manually take element from _visibleColumns and put in hiddenColumns to simulate drag/drop.
    let a:TableColumn = ((component as any)['_visibleColumns']()).splice(1,2);
    ((component as any)['hiddenColumns']()).push(a);

    // visibleColumns shouldn't have changed
    // _visibleColumns should have changed
    // hiddenColumns should have changed
    expect(component.visibleColumns()).toEqual(visibleColumnsBeforeChange);
    expect((component as any)['hiddenColumns']()).not.toEqual(hiddenBeforeChange);
    expect((component as any)['_visibleColumns']()).not.toEqual(_visibleColumnsBeforeChange);

    //handleSave 
    (component as any)['handleSave']();
    expect(component.visibleColumns()).not.toEqual(visibleColumnsBeforeChange);

    (component as any)['handleReset']();
    expect((component as any)['hiddenColumns']()).toEqual(hiddenBeforeChange);
    expect((component as any)['_visibleColumns']()).toEqual(_visibleColumnsBeforeChange);
    


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


