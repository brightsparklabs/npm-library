import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { ColumnsSelectorDialogComponent, TableColumn } from '../columns-selector-dialog/columns-selector-dialog.component';

const DEFAULT_COLUMNS = [
  { field: "firstName", header: "First name", width: "10rem" },
  { field: "lastNameName", header: "Last name", width: "10rem" },
  { field: "dateOfBirth", header: "Date of birth", width: "10rem" },
]

/**
 * Jdoc.
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

/** 
 * Jdoc. 
 */
export class DummyComponent {

  /** Jdoc. */
  protected readonly showColumnsSelector = signal<boolean>(false);
  /** Jdoc. */
  readonly defaultTableColumns = input<Array<TableColumn>>(DEFAULT_COLUMNS);
  /** Jdoc. */
  readonly visibleTableColumns = signal<Array<TableColumn>>(DEFAULT_COLUMNS);
}
