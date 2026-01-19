import { ChangeDetectionStrategy, Component } from '@angular/core';

/** The home page of the dev app. */
@Component({
  template: `
    <h1>Dev App</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {}
