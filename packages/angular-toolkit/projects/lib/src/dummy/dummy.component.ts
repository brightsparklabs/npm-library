import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { ColumnsSelectorDialogComponent, GenericTableData } from '../columns-selector-dialog/columns-selector-dialog.component';

const DEFAULT_COLUMNS = [
  { label: "First name"},
  { label: "Last name"},
  { label: "Date of birth"},
]

const TEST_COLUMNS = [
  { label: "First name"},
  { label: "Last name"},
]

/**
 * A component used purely for dev testing the {@link ColumnsSelectorDialogComponent}.
 * Creates a button to open the dialog, and loads in some test data.
 */
@Component({
  selector: 'bsl-dummy',
  imports: [
    Button,
    ColumnsSelectorDialogComponent
  ],
  templateUrl: './dummy.component.html',
  styleUrl: './dummy.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DummyComponent {

  /** The dialog doesn't open automatically. Need to press the button to open it. */
  protected readonly showColumnsSelector = signal<boolean>(false);
  /** Pass in all of the columns. */
  readonly defaultTableColumns = input<Array<GenericTableData>>(DEFAULT_COLUMNS);
  /** Pass in the columns that you want to be visible. */
  readonly visibleTableColumns = signal<Array<GenericTableData>>(TEST_COLUMNS);
}
