/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { signal, runInInjectionContext, EnvironmentInjector } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { debouncedSignal } from './debounced-signal';

describe("debouncedSignal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should hold initialValue and debounce updates", async () => {
    const injector = TestBed.inject(EnvironmentInjector);
    const source = signal('data');
    const debounced = runInInjectionContext(injector, () => 
      debouncedSignal(source, 'data', 100)
    );

    expect(debounced()).toBe('data');
    source.set('dataa');
    expect(debounced()).toBe('data');

    await vi.advanceTimersByTimeAsync(50);
    expect(debounced()).toBe('data');

    await vi.advanceTimersByTimeAsync(50);
    expect(debounced()).toBe('dataa');
  });

  it("Should handle dynamic debounce time via signal", async () => {
    const injector = TestBed.inject(EnvironmentInjector);
    const source = signal('data');
    const timeDelay = signal(100);
    const debounced = runInInjectionContext(injector, () => 
      debouncedSignal(source, 'data', timeDelay)
    );

    source.set('dataa');
    await vi.advanceTimersByTimeAsync(50);

    expect(debounced()).toBe('data');

    timeDelay.set(500);
    await vi.advanceTimersByTimeAsync(100);

    expect(debounced()).toBe('data'); 

    await vi.advanceTimersByTimeAsync(400);
    
    expect(debounced()).toBe('dataa');
  });

  it("Should hold initialValue and debounce updates for object data", async () => {
    const injector = TestBed.inject(EnvironmentInjector);
    const source = signal([1,2,3,4]);
    const debounced = runInInjectionContext(injector, () => 
      debouncedSignal(source, [1,2,3,4], 100)
    );

    expect(debounced()).toStrictEqual([1,2,3,4]);
    source.set([1,2,3,4,5]);
    expect(debounced()).toStrictEqual([1,2,3,4]);

    await vi.advanceTimersByTimeAsync(50);
    expect(debounced()).toStrictEqual([1,2,3,4]);

    await vi.advanceTimersByTimeAsync(50);
    expect(debounced()).toStrictEqual([1,2,3,4,5]);
  });

  it("Should handle dynamic debounce time via signal with object data", async () => {
    const injector = TestBed.inject(EnvironmentInjector);
    const source = signal([1,2,3,4]);
    const timeDelay = signal(100);
    const debounced = runInInjectionContext(injector, () => 
      debouncedSignal(source, source(), timeDelay)
    );

    source.set([1,2,3,4,5]);
    await vi.advanceTimersByTimeAsync(50);

    expect(debounced()).toStrictEqual([1,2,3,4]);

    timeDelay.set(500);
    await vi.advanceTimersByTimeAsync(100);

    expect(debounced()).toStrictEqual([1,2,3,4]); 

    await vi.advanceTimersByTimeAsync(400);
    
    expect(debounced()).toStrictEqual([1,2,3,4,5]);
  });
});
