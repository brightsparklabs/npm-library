import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HelloWorld } from '@brightsparklabs/angular-toolkit';

@Component({
  imports: [HelloWorld],
  template: `<bsl-hello-world />`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HelloWorldPage {}
