/*
 * Created by brightSPARK Labs
 * www.brightsparklabs.com
 */

import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import {
  CheckboxConfirmDialog,
  CheckBoxConfirmDialogOutput,
} from "@brightsparklabs/angular-toolkit";
import { ButtonModule } from "primeng/button";
import { DialogService } from "primeng/dynamicdialog";

/** The dev page for the {@link checkboxConfirmDialog} component. */
@Component({
  imports: [ButtonModule],
  template: `
    <h2>Checkbox Testing Page</h2>
    <p-button (click)="onClick()">click</p-button>
    <p>Checked: {{ checkedValue() }}</p>
    <p>Confirmed: {{ confirmedValue() }}</p>
  `,
  providers: [{ provide: DialogService }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CheckboxConfirmDialogPage {
  // -----------------------------------------------------------------------------------------------
  // DEPENDENCIES
  // -----------------------------------------------------------------------------------------------

  /** References the DialogService from providers. */
  private readonly dialogService = inject(DialogService);

  // -----------------------------------------------------------------------------------------------
  // INSTANCE VARIABLES
  // -----------------------------------------------------------------------------------------------

  /** String for displaying/ testing onClose `checked` value. */
  protected readonly checkedValue = signal<string>("");

  /** String for displaying/ testing onClose `confirmed` value. */
  protected readonly confirmedValue = signal<string>("");

  // -----------------------------------------------------------------------------------------------
  // PROTECTED METHODS
  // -----------------------------------------------------------------------------------------------

  /** Displays dialog and handles onClose logic. */
  protected onClick(): void {
    const ref = this.dialogService.open(CheckboxConfirmDialog, {
      header: "Set some setting...",
      modal: true,
      width: "40rem",
      inputValues: {
        acceptLabel: "Do something",
        rejectLabel: "Do something else",
        message: "Example description",
        checkboxLabel: "Don't ask me again",
        helpText: "Selection can be changed in the settings",
      },
    });

    ref?.onClose.subscribe((output: CheckBoxConfirmDialogOutput) => {
      this.checkedValue.set(output.checked.toString());
      this.confirmedValue.set(output.confirmed.toString());
    });
  }
}
