/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { ChangeDetectionStrategy, Component, model, input, linkedSignal, untracked } from '@angular/core';
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
  readonly visibleColumns = model.required<Array<GenericTableData>>();

  // -----------------------------------------------------------------------------------------------
  // COMPONENT INPUTS
  // -----------------------------------------------------------------------------------------------


  /** The list of all the columns which can be displayed within the table. */
  readonly columns = input.required<Array<GenericTableData>>();

  /**
   * Jdoc.
   */
  readonly label = input<string>('header');



  // -----------------------------------------------------------------------------------------------
  // INSTANCE VARIABLES
  // -----------------------------------------------------------------------------------------------

  /**
   * The list of columns which are actively visible. We use this such that we only sync the
   * update {@link visibleColumns} when the user saves the changes via {@link handleSave}.
   */
  protected readonly _visibleColumns = linkedSignal<Array<GenericTableData>>(() =>
    [...this.visibleColumns()],
  );

  /** The list of columns which are hidden. */
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

  /** Saves the changes to the visible columns and closes the modal. */
  protected handleSave(): void {
    this.visibleColumns.set([...this._visibleColumns()]);

    this.visible.set(false);
  }

  /** Resets the columns to the default view. */
  protected handleReset(): void {


    this._visibleColumns.set([...this.columns()]);
    this.hiddenColumns.set([]);


  }

  /** Cancel out of the modal, return everything to the last saved state. */
  protected handleCancel(): void {

    this.visibleColumns.set([...this.visibleColumns()]);
    this.visible.set(false);
  }
}




















// -------------------------------------------------------------------------------------------------
// TYPES & INTERFACES
// -------------------------------------------------------------------------------------------------

/**
 * Jdoc.
 */
export interface GenericTableData {

  /** Jdoc. */
  label:string;
}