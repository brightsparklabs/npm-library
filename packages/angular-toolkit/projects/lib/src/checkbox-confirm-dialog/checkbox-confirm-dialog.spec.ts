import { describe, expect, test, it, Mocked } from "vitest";
import { page } from 'vitest/browser'
import { CheckboxConfirmDialogComponent, 
    CheckBoxConfirmDialogOutput } from "./checkbox-confirm-dialog.component"
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { inject, inputBinding, signal } from "@angular/core";
import { Dialog } from "primeng/dialog";

describe('Checkbox', async () => {
    let component: CheckboxConfirmDialogComponent
    let fixture: ComponentFixture<CheckboxConfirmDialogComponent>
    let dynamicDialogRefSpy: Mocked<DynamicDialogRef>;
 
    beforeEach(async () => {
    
    //Mock service for the dialogService/ DynamicDialogRef.
    const spy: Mocked<DynamicDialogRef> = {close: vi.fn(), onClose: vi.fn()};
    
    await TestBed.configureTestingModule({
      imports: [CheckboxConfirmDialogComponent],
      providers: [{provide: DynamicDialogRef, useValue: spy}],
    }).compileComponents();

    //Setting a value for required input checkboxLabel.
    fixture = TestBed.createComponent(CheckboxConfirmDialogComponent, {
        bindings: [
          //static binding  
          inputBinding('checkboxLabel', () => "test" ),
        ],
    });
    component = fixture.componentInstance;

    dynamicDialogRefSpy = TestBed.inject(DynamicDialogRef) as Mocked<DynamicDialogRef>

    await fixture.whenStable();
  });

  it("Should create.", () => {
    expect(component).toBeTruthy();
  });

  it("Mock DynamicDialogRef.close callable.", () => {
    const getCloseCalls = vi.spyOn(dynamicDialogRefSpy, 'close');
    dynamicDialogRefSpy.close();
    expect(getCloseCalls).toHaveBeenCalledTimes(1)
  });

  it("Checkbox exists and clickable/ checkable.", async () => {
    const cb = page.getByRole('checkbox');
    expect(cb).not.toBeChecked();
    await cb.click()
    expect(cb).toBeChecked();
  });

  it("confirm clickable, close called.", async () => {
    const getCloseCalls = vi.spyOn(dynamicDialogRefSpy, 'close');
    expect(getCloseCalls).toHaveBeenCalledTimes(0)
    //Open?
    //Click button.
    await page.getByRole('button', {name: /confirm/i}).click();
    //Check for calls.
    expect(getCloseCalls).toHaveBeenCalledTimes(1)
    //Get the confirmed and checked values.
    //dynamicDialogRefSpy?.onClose.subscribe((output: CheckBoxConfirmDialogOutput) => {
    //  expect(output.checked).toBe(false);
    //  expect(output.confirmed).toBe(true);
    //});
  });
});
