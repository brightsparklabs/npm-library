import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BslLogoComponent } from "@brightsparklabs/angular-toolkit";

/** The dev page for the component. */
@Component({
  imports: [BslLogoComponent],
  template: `<bsl-logo />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BslLogoPage {}
