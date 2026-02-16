/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { ChangeDetectionStrategy, Component, model, input, linkedSignal, untracked } from '@angular/core';
import { Button } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { PickListModule } from 'primeng/picklist';

/**
 * A dialog to configure the order and visibility of columns in a table.
 * 
 * The dialog outputs to {@link visibleColumns} and holds all the columns that should be visible.
 */
@Component({
  selector: 'bsl-columns-selector-dialog',
  imports: [Dialog, Button, PickListModule],
  templateUrl: './columns-selector-dialog.component.html',
  styleUrl: './columns-selector-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnsSelectorDialogComponent {
  // -----------------------------------------------------------------------------------------------
  // COMPONENT MODELS
  // -----------------------------------------------------------------------------------------------

  /** If the dialog should be visible. */
  readonly visible = model.required<boolean>();

  /** Columns which are actively visible. */
  readonly visibleColumns = model.required<Array<GenericTableData>>();

  // -----------------------------------------------------------------------------------------------
  // COMPONENT INPUTS
  // -----------------------------------------------------------------------------------------------

  /** All the columns which can be displayed within the table. */
  readonly columns = input.required<Array<GenericTableData>>();

  /**
   * Takes whatever sort of naming convention the input table uses. Defaults to 'header'.
   */
  readonly label = input<string>('header');

  // -----------------------------------------------------------------------------------------------
  // INSTANCE VARIABLES
  // -----------------------------------------------------------------------------------------------

  /**
   * The list of columns which are actively visible in the dialog.
   * We use this such that we only update {@link visibleColumns} when the user saves the changes 
   * via {@link handleSave}.
   */
  protected readonly _visibleColumns = linkedSignal<Array<GenericTableData>>(() =>
    [...this.visibleColumns()],
  );

  /** 
   * TODO: Fix the issue with this logic. In test cases where we start with some columns in hidden,
   * all columns from columns() appear in hidden, along with the correct columns in _visibleColumns.
   */

  /** 
   * The list of columns which are hidden. 
   * This should be calculated by taking visibleColumns from columns.
   */
  protected readonly hiddenColumns = linkedSignal<boolean,Array<GenericTableData>>({
    source: () => this.visible(),
    computation: (source, previous) => {
      if (source === true) {
        return untracked(() => this.columns().filter((c) => !this.visibleColumns().includes(c)))
      }
      return previous?.value ?? [];
    },
    equal: (_a,_b) => this.visible() === false
  });

  // -----------------------------------------------------------------------------------------------
  // PROTECTED METHODS
  // -----------------------------------------------------------------------------------------------

  /** Saves the changes to the visible columns and closes the dialog. */
  protected handleSave(): void {
    this.visibleColumns.set([...this._visibleColumns()]);
    this.visible.set(false);
  }

  /** 
   * Resets the dialog, putting all columns back in {@link _visibleColumns}.
   * The reset columns aren't saved.
   */
  protected handleReset(): void {
    this._visibleColumns.set([...this.columns()]);
    this.hiddenColumns.set([]);
  }

  /** Cancel out of the dialog, returning everything to the last saved state. */
  protected handleCancel(): void {
    this.visibleColumns.set([...this.visibleColumns()]);
    this.visible.set(false);
  }
}

// -------------------------------------------------------------------------------------------------
// TYPES & INTERFACES
// -------------------------------------------------------------------------------------------------

/**
 * Input type for the dialog.
 */
export interface GenericTableData {
  /** Generic label. */
  label:string;
}