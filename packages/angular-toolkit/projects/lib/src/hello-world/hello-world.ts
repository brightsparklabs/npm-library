import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bsl-hello-world',
  imports: [],
  templateUrl: './hello-world.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelloWorld {

}
