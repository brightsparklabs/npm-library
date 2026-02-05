/*
 * Created by brightSPARK Labs
 * www.brightsparklabs.com
 */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { describe, expect, it, Mocked } from "vitest";
import { page } from "vitest/browser";
import { CheckboxConfirmDialogComponent } from "./checkbox-confirm-dialog.component";

describe("CheckboxConfirmDialog Tests", async () => {
  let component: CheckboxConfirmDialogComponent;
  let fixture: ComponentFixture<CheckboxConfirmDialogComponent>;
  let dynamicDialogRefSpy: Mocked<DynamicDialogRef>;

  beforeEach(async () => {
    //Mock service for the dialogService/ DynamicDialogRef.
    const spy: Mocked<DynamicDialogRef> = { close: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [CheckboxConfirmDialogComponent],
      providers: [{ provide: DynamicDialogRef, useValue: spy }],
    }).compileComponents();

    //Setting a value for required input checkboxLabel.
    fixture = TestBed.createComponent(CheckboxConfirmDialogComponent);
    fixture.componentRef.setInput("checkboxLabel", "test value");
    component = fixture.componentInstance;

    dynamicDialogRefSpy = TestBed.inject(DynamicDialogRef) as Mocked<DynamicDialogRef>;

    await fixture.whenStable();
  });

  it("Should create.", () => {
    expect(component).toBeTruthy();
  });

  it("Default values loaded/ displayed.", () => {
    expect(page.getByRole("checkbox", { name: "test value", exact: true })).toBeInTheDocument();
    expect(page.getByRole("button", { name: "Confirm", exact: true })).toBeInTheDocument();
    expect(page.getByRole("button", { name: "Cancel", exact: true })).toBeInTheDocument();
    //Message does not have properly configured aria name/ role.
    expect(page.getByText("Please confirm", { exact: true })).toBeInTheDocument();
  });

  it("Custom values loaded/ displayed.", async () => {
    fixture.componentRef.setInput("checkboxLabel", "new checkbox");
    fixture.componentRef.setInput("confirmLabel", "new confirm");
    fixture.componentRef.setInput("cancelLabel", "new cancel");
    fixture.componentRef.setInput("message", "new message");

    await fixture.whenStable();

    expect(page.getByRole("checkbox", { name: "new checkbox", exact: true })).toBeInTheDocument();
    expect(page.getByRole("button", { name: "new confirm", exact: true })).toBeInTheDocument();
    expect(page.getByRole("button", { name: "new cancel", exact: true })).toBeInTheDocument();
    //Message does not have properly configured aria name/ role.
    expect(page.getByText("new message", { exact: true })).toBeInTheDocument();
  });

  it("Help message hover element loads with non-undefined value", async () => {
    const helpHoverElement = await document.getElementsByClassName("pi ti-help-circle")[0];
    expect(helpHoverElement).toBe(undefined);

    fixture.componentRef.setInput("helpText", "help text");
    await fixture.whenStable();

    const newHelpHoverElement = await document.getElementsByClassName("pi ti-help-circle")[0];
    expect(newHelpHoverElement).not.toBe(undefined);
  });

  it("Help message updates from default", async () => {
    fixture.componentRef.setInput("helpText", "help text");
    await fixture.whenStable();

    /*
     * The help icon element doesn't have a role, name or any text values set,
     * so it can't be get as a Locator initially.
     */
    const helpHoverElement = await document.getElementsByClassName("pi ti-help-circle")[0];

    //Default width of the help icon is 0px, which can't be hovered.
    /*
     * TODO: The componenet styles for
     * DialogService, DynamicDialogRef and/ or checkboxConfirmDialogComponent
     * aren't being applied during testing, which is causing this issue.
     * Once the styles have been applied this line can be removed.
     */
    helpHoverElement.setAttribute("style", "width:50px");

    //Converting the Element to a Locator, which is needed for the hover() function.
    const helpHoverLocator = page.elementLocator(helpHoverElement);
    const helpTextValue = page.getByRole("tooltip", { name: "help text", exact: true });

    expect(helpTextValue).not.toBeInTheDocument();
    //Using mock timers to avoid having to wait for the hover element to display.
    vi.useFakeTimers();
    await helpHoverLocator.hover();
    vi.runAllTimers();
    vi.useRealTimers();

    expect(helpTextValue).toBeInTheDocument();
  });

  it("Mock DynamicDialogRef.close callable.", () => {
    dynamicDialogRefSpy.close();
    expect(dynamicDialogRefSpy.close).toHaveBeenCalledTimes(1);
  });

  it("Checkbox exists and clickable/ checkable.", async () => {
    const cb = page.getByRole("checkbox");
    expect(cb).not.toBeChecked();
    await cb.click();
    expect(cb).toBeChecked();
  });

  it("close() is called on confirm clicked.", async () => {
    expect(dynamicDialogRefSpy.close).toHaveBeenCalledTimes(0);
    await page.getByRole("button", { name: /confirm/i }).click();
    expect(dynamicDialogRefSpy.close).toHaveBeenCalledTimes(1);
  });

  it("Checkbox unchecked, cancel clicked (false, false).", async () => {
    await page.getByRole("button", { name: /cancel/i }).click();
    expect(dynamicDialogRefSpy.close).toHaveBeenCalledWith({
      confirmed: false,
      checked: false,
    });
  });

  it("Checkbox checked, confirm clicked (true, true).", async () => {
    await page.getByRole("checkbox").click();
    await page.getByRole("button", { name: /confirm/i }).click();
    expect(dynamicDialogRefSpy.close).toHaveBeenCalledWith({
      confirmed: true,
      checked: true,
    });
  });
});
