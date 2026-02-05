/*
 * Created by brightSPARK Labs
 * www.brightsparklabs.com
 */

import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import {
  CheckboxConfirmDialogComponent,
  CheckBoxConfirmDialogOutput,
} from "@brightsparklabs/angular-toolkit";
import { DialogService } from "primeng/dynamicdialog";

/** The dev page for the {@link CheckboxConfirmDialogComponent} component. */
@Component({
  imports: [],
  template: `
    <h2>Checkbox Testing Page</h2>
    <button (click)="onClick()">click</button>
    <p>Checked: {{ checkedValue() }}</p>
    <p>Confirmed: {{ confirmedValue() }}</p>
  `,
  providers: [{ provide: DialogService }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CheckboxConfirmDialogPage {
  /** References the DialogService from providers. */
  private readonly dialogService = inject(DialogService);

  /** String for displaying/ testing onClose `checked` value. */
  protected readonly checkedValue = signal<string>("");

  /** String for displaying/ testing onClose `confirmed` value. */
  protected readonly confirmedValue = signal<string>("");

  /** Display dialog and handles onClose logic. */
  onClick(): void {
    const ref = this.dialogService.open(CheckboxConfirmDialogComponent, {
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
