/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { type Signal, isSignal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { debounceTime, switchMap } from "rxjs";

// -------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// -------------------------------------------------------------------------------------------------

/**
 * Creates a signal from another where the update of the value is debounced.
 *
 * @param valueSignal The signal to debounce.
 * @param initialValue The initial value of the debounced signal.
 * @param time The time in milliseconds to debounce by.
 * @returns The debounced signal for the valueSignal.
 */
export function debouncedSignal<T>(
  valueSignal: Signal<T>,
  initialValue: T,
  time: number | Signal<number> = 0,
): Signal<T> {
  if (!isSignal(time)) {
    // The debounce time is a fixed number so there's no need to account for any changes to
    // its value when creating the debounced signal.
    return toSignal(toObservable(valueSignal).pipe(debounceTime(time)), { initialValue });
  }

  const valueObservable = toObservable(valueSignal);
  // This ensures that the resulting signal handles changes to the debounced "time" signal.
  return toSignal(
    toObservable(time).pipe(switchMap((time) => valueObservable.pipe(debounceTime(time)))),
    { initialValue },
  );
}
