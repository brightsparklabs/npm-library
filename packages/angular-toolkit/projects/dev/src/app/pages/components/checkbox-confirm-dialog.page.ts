import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
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
    <p>
      Checked and Confirmed values for a previous dialog box will only update when next clicking the
      button
    </p>
    <button (click)="onClick()">click</button>
    <p>Checked: {{ checkedValue }}</p>
    <p>Confirmed: {{ confirmedValue }}</p>
  `,
  providers: [{ provide: DialogService }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CheckboxConfirmDialogPage {
  /** String for displaying/ testing onClose output values (checked). */
  checkedValue = "";
  /** String for displaying/ testing onClose output values (confirmed). */
  confirmedValue = "";
  /** References the DialogService from providers. */
  dialogService = inject(DialogService);

  /** Display dialog and handles onClose logic. */
  onClick() {
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
      this.checkedValue = output.checked.toString();
      this.confirmedValue = output.confirmed.toString();
    });
  }
}
