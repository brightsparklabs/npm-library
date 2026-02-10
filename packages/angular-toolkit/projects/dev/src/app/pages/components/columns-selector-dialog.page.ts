import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ColumnsSelectorDialogComponent } from "@brightsparklabs/angular-toolkit";

/** The dev page for the {@link HelloWorld} component. */
@Component({
  imports: [ColumnsSelectorDialogComponent],
  template: `
    <bsl-columns-selector-dialog [visible]="true" [visibleColumns]=[] [columns]=[]/>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ColumnsSelectorDialogPage {


}