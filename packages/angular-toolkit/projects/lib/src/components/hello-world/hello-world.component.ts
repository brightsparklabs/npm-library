import { ChangeDetectionStrategy, Component } from "@angular/core";

/** An example component. */
@Component({
  selector: "bsl-hello-world",
  imports: [],
  templateUrl: "./hello-world.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelloWorld {}
