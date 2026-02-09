/*
 * Created by brightSPARK Labs
 * www.brightsparklabs.com
 */

import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HighlightTextComponent } from "@brightsparklabs/angular-toolkit";
import { InputTextModule } from "primeng/inputtext";

/** The dev page for the {@link HighlightTextComponent} component. */
@Component({
  imports: [HighlightTextComponent, FormsModule, InputTextModule],
  template: `
    <h2>Highlight Text Component Demo</h2>
    <div class="highlight-text-controls">
      <div class="highlight-text-inputs">
        <div class="input-group">
          <span>Text</span>
          <input pInputText [(ngModel)]="text" />
        </div>

        <div class="input-group">
          <span>Delimiter</span>
          <input pInputText [(ngModel)]="delimiter" />
        </div>
      </div>
      <span>Output</span>
      <bsl-highlight-text [text]="text()" [delimiter]="delimiter()" />
    </div>
  `,
  styles: `
    .highlight-text-controls {
      display: flex;
      flex-direction: column;
      width: 240px;
      gap: 0.25rem;
      margin: 1rem;
    }

    .highlight-text-inputs {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
    }

    .input-group span {
      font-weight: 600;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HighlightTextComponentPage {
  // -----------------------------------------------------------------------------------------------
  // INSTANCE VARIABLES
  // -----------------------------------------------------------------------------------------------

  /** Default text that will display in the component. */
  protected readonly text = signal<string>("hello *hi*");

  /** Default delimiter that will be used to highlight text. */
  protected readonly delimiter = signal<string>("*");
}
