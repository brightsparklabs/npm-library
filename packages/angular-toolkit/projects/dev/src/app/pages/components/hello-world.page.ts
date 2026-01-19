import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HelloWorld } from '@brightsparklabs/angular-toolkit';

/** The dev page for the {@link HelloWorld} component. */
@Component({
  imports: [HelloWorld],
  template: `<bsl-hello-world />`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HelloWorldPage {}
