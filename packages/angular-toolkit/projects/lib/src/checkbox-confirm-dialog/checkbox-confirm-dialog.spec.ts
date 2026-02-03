import { describe, expect, test, it, Mocked } from "vitest";
import { CheckboxConfirmDialogComponent, 
    CheckBoxConfirmDialogOutput } from "./checkbox-confirm-dialog.component"
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { inject, inputBinding } from "@angular/core";
import { Dialog } from "primeng/dialog";

describe('Checkbox', async () => {
    let component: CheckboxConfirmDialogComponent
    let fixture: ComponentFixture<CheckboxConfirmDialogComponent>
    let dynamicDialogRefSpy: Mocked<DynamicDialogRef>;
    


    beforeEach(async () => {

    const spy: Mocked<DynamicDialogRef> = {close: vi.fn()};
    
    await TestBed.configureTestingModule({
      imports: [CheckboxConfirmDialogComponent],
      providers: [{provide: DynamicDialogRef, useValue: spy}],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxConfirmDialogComponent, {
        bindings: [
            inputBinding('checkboxLabel', () => "test" ),
        ],
    });
    component = fixture.componentInstance;

    dynamicDialogRefSpy = TestBed.inject(DynamicDialogRef) as Mocked<DynamicDialogRef>

    //dsComponent = dsFixture.componentInstance
    //component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("onclose", () => {
    //click on close button
    //fixture.componentRef.setInput("checkboxLabel", "value");
    //click
    expect(dynamicDialogRefSpy).toHaveBeenCalledTimes(1)
  });
});
