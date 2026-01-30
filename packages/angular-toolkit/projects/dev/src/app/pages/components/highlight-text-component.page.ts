import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HighlightTextComponent } from "@brightsparklabs/angular-toolkit";

/** The dev page for the {@link HighlightTextComponent} component. */
@Component({
  imports: [HighlightTextComponent, FormsModule],
  template: `
    <h2>Highlight Text Component Demo</h2>
    <div class="highlight-text-controls">
      <div class="highlight-text-inputs">
        <div class="input-group">
          <span>Text</span>
          <input [ngModel]="text()" (ngModelChange)="text.set($event)" />
        </div>

        <div class="input-group">
          <span>Delimiter</span>
          <input [ngModel]="delimiter()" (ngModelChange)="delimiter.set($event)" />
        </div>
      </div>
      <span>Output</span>
      <bsl-app-highlight-text [text]="text()" [delimiter]="delimiter()" />
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

    input {
      padding: 0.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      color: var(--p-surface-500);
      border: 2px solid var(--p-surface-500);
      appearance: none;
      transition: all 0.2s ease;
    }

    input:focus {
      outline: none;
      color: var(--p-surface-800);
      border: 2px solid var(--p-surface-800);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HighlightTextComponentPage {
  /** Default text that will display in the component. */
  readonly text = signal("hello *hi*");
  /** Default delimiter that will be used to highlight text. */
  readonly delimiter = signal("*");
}
