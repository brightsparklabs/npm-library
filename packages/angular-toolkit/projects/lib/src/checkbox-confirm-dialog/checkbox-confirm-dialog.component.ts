/*
 * Created by brightSPARK Labs
 * www.brightsparklabs.com
 */

import { ChangeDetectionStrategy, Component, inject, input, signal } from "@angular/core";
import { Button } from "primeng/button";
import { Checkbox } from "primeng/checkbox";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { Tooltip } from "primeng/tooltip";

/**
 * Custom confirm dialog with a checkbox.
 * Designed to be used with PrimeNG's dynamic dialog component:
 * https://primeng.org/dynamicdialog.
 *
 * Dialog output values can be accessed through the dialog's onClose function.
 *
 * @example
 * ```
 * const ref = this.dialogService.open(CheckboxConfirmDialogComponent, {...});
 *
 * ref?.onClose.subscribe((output: CheckBoxConfirmDialogOutput) => {...});
 * ```
 */
@Component({
  selector: "bsl-checkbox-confirm-dialog",
  imports: [Checkbox, Button, Tooltip],
  templateUrl: "./checkbox-confirm-dialog.component.html",
  styleUrl: "./checkbox-confirm-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxConfirmDialogComponent {
  // -----------------------------------------------------------------------------------------------
  // DEPENDENCIES
  // -----------------------------------------------------------------------------------------------

  /** The reference to the currently opened dynamic dialog. */
  private readonly ref = inject(DynamicDialogRef);

  // -----------------------------------------------------------------------------------------------
  // COMPONENT INPUTS
  // -----------------------------------------------------------------------------------------------

  /** Label for checkbox. */
  readonly checkboxLabel = input.required<string>();

  /** Label of the confirm button. Default: `Confirm`.*/
  readonly confirmLabel = input<string>("Confirm");

  /** Label of the cancel button. Default: `Cancel`.*/
  readonly cancelLabel = input<string>("Cancel");

  /** Message to display. Default: `Please confirm`.*/
  readonly message = input<string>("Please confirm");

  /** Help text. Default: `undefined`.*/
  readonly helpText = input<string | undefined>(undefined);

  // -----------------------------------------------------------------------------------------------
  // INSTANCE VARIABLES
  // -----------------------------------------------------------------------------------------------

  /** Whether the checkbox is checked or not. Default: `false`.*/
  protected readonly checked = signal<boolean>(false);

  // -----------------------------------------------------------------------------------------------
  // PROTECTED METHODS
  // -----------------------------------------------------------------------------------------------

  /** Method called when confirm button is clicked. */
  protected onConfirm(): void {
    this.ref.close({
      confirmed: true,
      checked: this.checked(),
    });
    return;
  }
  /** Method called when cancel button is clicked. */
  protected onCancel(): void {
    this.ref.close({
      confirmed: false,
      checked: this.checked(),
    });
    return;
  }
}

// -------------------------------------------------------------------------------------------------
// TYPES & INTERFACES
// -------------------------------------------------------------------------------------------------

/** Output type for this dialog. */
export interface CheckBoxConfirmDialogOutput {
  /** Whether user pressed accept or not. */
  confirmed: boolean;
  /** Whether checked or not. */
  checked: boolean;
}
