/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { ChangeDetectionStrategy, Component, model, input, linkedSignal, /*computed*/ } from '@angular/core';
import { Button } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { PickListModule } from 'primeng/picklist';

/**
 * Placeholder.
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

  /** If the modal should be visible. */
  readonly visible = model.required<boolean>();

  /** The list of columns which are actively visible. */
  readonly visibleColumns = model.required<Array<TableColumn>>();

  // -----------------------------------------------------------------------------------------------
  // COMPONENT INPUTS
  // -----------------------------------------------------------------------------------------------

  /** The list of all the columns which can be displayed within the table. */
  readonly columns = input.required<Array<TableColumn>>();

  // -----------------------------------------------------------------------------------------------
  // INSTANCE VARIABLES
  // -----------------------------------------------------------------------------------------------

  /**
   * The list of columns which are actively visible. We use this such that we only sync the
   * update {@link visibleColumns} when the user saves the changes via {@link onSave}.
   */
  protected readonly _visibleColumns = linkedSignal<Array<TableColumn>>(() =>
    this.visibleColumns(),
  );

  /** The list of columns which are hidden. */
  protected readonly hiddenColumns = linkedSignal<Array<TableColumn>>(() =>
    this.columns().filter((c) => !this.visibleColumns().includes(c)),
  );

  /** The total number of fixed columns. */
  // private readonly fixedCount = computed<number>(
  //   () => this.columns().filter((c) => c["fixed"]).length,
  // );


  // -----------------------------------------------------------------------------------------------
  // PROTECTED METHODS
  // -----------------------------------------------------------------------------------------------

  /** Saves the changes to the visible columns and closes the modal. */
  protected handleSave(): void {
    this.visibleColumns.set([...this._visibleColumns()]);
    this.visible.set(false);
  }

  /** Resets the columns to the default view. */
  protected handleReset(): void {
    this._visibleColumns.set(this.columns());
    this.hiddenColumns.set([]);
  }
}




























// -------------------------------------------------------------------------------------------------
// TYPES & INTERFACES
// -------------------------------------------------------------------------------------------------

/** Models a column in the table. */
export interface TableColumn {
  /** The field in the data to use for the column. */
  field: string;

  /** The label to use for the columns header. */
  header: string;

  /** The width of the columns e.g. "50px", "3rem" etc. */
  width: string;

  /** The type of filter control to use for the column.  */
  // filterType: TreeTableFilterType["type"];

  /** If the column should be fixed in it's position. */
  // fixed?: boolean;
}