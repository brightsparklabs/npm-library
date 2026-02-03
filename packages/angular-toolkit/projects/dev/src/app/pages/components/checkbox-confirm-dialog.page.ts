import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CheckboxConfirmDialogComponent, CheckBoxConfirmDialogOutput } from "@brightsparklabs/angular-toolkit"
import { DialogService} from "primeng/dynamicdialog";

/** The dev page for the {@link CheckboxConfirmDialogComponent} component. */
@Component({
  imports: [],
  template: `
    <p>Checkbox</p>
    <button (click)="onClick()">click</button>
  `,
  providers: [{provide: DialogService}],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CheckboxConfirmDialogPage {

  // eslint-disable-next-line jsdoc/require-jsdoc
  dialogService = inject(DialogService);

  // eslint-disable-next-line jsdoc/require-jsdoc
  onClick() { 
    // eslint-disable-next-line jsdoc/require-jsdoc
    const ref = this.dialogService.open(CheckboxConfirmDialogComponent, {
     header: "Set some setting...",
     modal: true,
     width: "40rem",
     inputValues: {
       acceptLabel: "Do something",
       rejectLabel: "Do something else",
       message: "Example description",
       checkboxLabel: "Don't ask me again",
       helpText: "Selection can be changed in the settings"
     },
   });
   
   ref?.onClose.subscribe((output: CheckBoxConfirmDialogOutput) => {
     if (output.checked) {
       return;
     }
     return;
   });

    };

  

}
