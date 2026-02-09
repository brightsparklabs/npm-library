/*
 * Created by brightSPARK Labs
 * www.brightsparklabs.com
 */

import { ChangeDetectionStrategy, Component, signal, type Signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { debouncedSignal } from "@brightsparklabs/angular-toolkit";
import { InputTextModule } from "primeng/inputtext";
import { SliderModule } from "primeng/slider";

/** The dev page for the thingo. */
@Component({
  imports: [FormsModule, SliderModule, InputTextModule],
  template: `
    <div style="padding: 1rem;">
      <h2>Debounced Signal Demo</h2>

      <input type="text" pInputText placeholder="Type here.." [(ngModel)]="text" />

      <div>
        <div>Raw: {{ text() }}</div>
        <div style="font-weight: bold;">Debounced: {{ delayedText() }}</div>
      </div>

      <div style="display: flex; flex-direction: column; width: 12rem; gap: 1rem;">
        <span>Delay: {{ delay() }}ms</span>
        <p-slider [step]="250" [min]="0" [max]="2000" [(ngModel)]="delay" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DebouncedSignalPage {
  // -----------------------------------------------------------------------------------------------
  // INSTANCE VARIABLES
  // -----------------------------------------------------------------------------------------------

  /** String signal to be debounced. */
  protected readonly text = signal<string>("");

  /** The time in milliseconds to debounce by. */
  protected readonly delay = signal<number>(1000);

  /** The value of the debounced string signal. */
  protected readonly delayedText: Signal<string> = debouncedSignal(this.text, "", this.delay);
}
