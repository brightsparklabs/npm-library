import { describe, expect, test, it, Mocked } from "vitest";
import { page } from 'vitest/browser'
import { CheckboxConfirmDialogComponent, 
    CheckBoxConfirmDialogOutput } from "./checkbox-confirm-dialog.component"
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { inject, inputBinding, signal } from "@angular/core";
import { Dialog } from "primeng/dialog";

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('Checkbox', async () => {
    let component: CheckboxConfirmDialogComponent
    let fixture: ComponentFixture<CheckboxConfirmDialogComponent>
    let dynamicDialogRefSpy: Mocked<DynamicDialogRef>;
 
    beforeEach(async () => {
    
    //Mock service for the dialogService/ DynamicDialogRef.
    const spy: Mocked<DynamicDialogRef> = {close: vi.fn()};
    
    await TestBed.configureTestingModule({
      imports: [CheckboxConfirmDialogComponent],
      providers: [{provide: DynamicDialogRef, useValue: spy}],
    }).compileComponents();

    //Setting a value for required input checkboxLabel.
    fixture = TestBed.createComponent(CheckboxConfirmDialogComponent);
    fixture.componentRef.setInput("checkboxLabel", "test value");
    //fixture.componentRef.setInput("helpText", "old help text");
    component = fixture.componentInstance;

    dynamicDialogRefSpy = TestBed.inject(DynamicDialogRef) as Mocked<DynamicDialogRef>

    await fixture.whenStable();
  });

  it("Should create.", () => {
    expect(component).toBeTruthy();
  });

  it("Default values loaded/ displayed.", () => {
      expect(page.getByRole('checkbox', { name: 'test value', exact: true })).toBeInTheDocument();
      expect(page.getByRole('button', { name: 'Confirm', exact: true })).toBeInTheDocument();
      expect(page.getByRole('button', { name: 'Cancel', exact: true })).toBeInTheDocument();
      //Message does not have properly configured aria name/ role.
      expect(page.getByText('Please confirm', { exact: true })).toBeInTheDocument();
      
  });

  it("Custom values loaded/ displayed.", async () => {
      fixture.componentRef.setInput("checkboxLabel", 'new checkbox');
      fixture.componentRef.setInput("confirmLabel", 'new confirm');
      fixture.componentRef.setInput("cancelLabel", 'new cancel');
      fixture.componentRef.setInput("message", 'new message');
      //need a small delay for the fixture updates to apply
      await delay(1);
      expect(page.getByRole('checkbox', { name: 'new checkbox', exact: true })).toBeInTheDocument();
      expect(page.getByRole('button', { name: 'new confirm', exact: true })).toBeInTheDocument();
      expect(page.getByRole('button', { name: 'new cancel', exact: true })).toBeInTheDocument();
      //Message does not have properly configured aria name/ role.
      expect(page.getByText('new message', { exact: true })).toBeInTheDocument();
  });

  it("Custom help text loaded/ displayed.", async () => {
      const helpHoverElement = await document.getElementsByClassName('pi ti-help-circle')[0];
      expect(helpHoverElement).toBe(undefined);

      fixture.componentRef.setInput("helpText", "help text");
      //need a small delay for the fixture updates to apply
      await delay(1);

      const newHelpHoverElement = await document.getElementsByClassName('pi ti-help-circle')[0];
      expect(newHelpHoverElement).not.toBe(undefined);
      //Need to get the element to hover over before help text is displayed,
      //but the element has no role, name or text.
      //<i _ngcontent-ng-c1340234011="" showdelay="1000" tooltipposition="top" class="pi ti-help-circle" pc28=""></i>
      
      
      /*
      const helpHoverElement = await document.getElementsByClassName('pi ti-help-circle')[0];
      console.log(helpHoverElement);
      const helpHoverLocator = page.elementLocator(helpHoverElement);
      console.log(helpHoverLocator);
      const helpTextValue = page.getByRole('tooltip', { name: 'help text', exact: true });

      expect(helpTextValue).not.toBeInTheDocument();
      await helpHoverLocator.hover();
      await delay(1100);
      expect(helpTextValue).toBeInTheDocument();
      */
  });

  it("Mock DynamicDialogRef.close callable.", () => {
    const getCloseCalls = vi.spyOn(dynamicDialogRefSpy, 'close');
    dynamicDialogRefSpy.close();
    expect(getCloseCalls).toHaveBeenCalledTimes(1)
  });

  it("Checkbox exists and clickable/ checkable.", async () => {
    const cb = page.getByRole('checkbox');
    expect(cb).not.toBeChecked();
    await cb.click();
    expect(cb).toBeChecked();
  });

  it("Confirm clickable, close called.", async () => {
    const getCloseCalls = vi.spyOn(dynamicDialogRefSpy, 'close');
    expect(getCloseCalls).toHaveBeenCalledTimes(0);
    await page.getByRole('button', {name: /confirm/i}).click();
    expect(getCloseCalls).toHaveBeenCalledTimes(1);
  });

  it("Checkbox unchecked, cancel clicked (false, false)", async () => {
    const getCloseCalls = vi.spyOn(dynamicDialogRefSpy, 'close');
    await page.getByRole('button', {name: /cancel/i}).click();
    expect(getCloseCalls).toHaveBeenCalledWith({
      confirmed: false,
      checked: false
    })
  })

  it("Checkbox checked, confirm clicked (true, true)", async () => {
    const getCloseCalls = vi.spyOn(dynamicDialogRefSpy, 'close');
    await page.getByRole('checkbox').click();
    await page.getByRole('button', {name: /confirm/i}).click();
    expect(getCloseCalls).toHaveBeenCalledWith({
      confirmed: true,
      checked: true
    })
  })
});
