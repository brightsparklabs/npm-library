import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <h1>Dev App</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {}
