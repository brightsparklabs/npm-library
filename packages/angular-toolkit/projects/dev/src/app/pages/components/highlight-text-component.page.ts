import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HighlightTextComponent } from "@brightsparklabs/angular-toolkit";

/** The dev page for the {@link HighlightTextComponent} component. */
@Component({
  imports: [HighlightTextComponent],
  template: `
    <h2>Highlight Text Component Demo</h2>
    <bsl-app-highlight-text [text]="defaultText" [delimiter]="'*'" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HighlightTextComponentPage {
  /** Default text that will display in the component. */
  defaultText = 'hello *hi*';
}