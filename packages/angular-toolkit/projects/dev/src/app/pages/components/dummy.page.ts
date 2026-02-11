import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DummyComponent } from "@brightsparklabs/angular-toolkit";

/** The dev page for the {@link HelloWorld} component. */
@Component({
  imports: [DummyComponent],
  template: `<bsl-dummy/>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DummyComponentPage {}