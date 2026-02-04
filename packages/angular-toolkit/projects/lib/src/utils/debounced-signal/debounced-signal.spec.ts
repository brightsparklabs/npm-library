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
      debouncedSignal(source, [1,2,3,4], timeDelay)
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

  it("Should always return initialValue before debounce time passes", async () => {
    const injector = TestBed.inject(EnvironmentInjector);
    const source = signal('initial');
    const debounced = runInInjectionContext(injector, () => 
      debouncedSignal(source, 'initial', 200)
    );

    source.set('a');
    source.set('b');
    source.set('c');

    expect(debounced()).toBe('initial');

    await vi.advanceTimersByTimeAsync(199);
    expect(debounced()).toBe('initial');

    await vi.advanceTimersByTimeAsync(1);
    expect(debounced()).toBe('c');
  });

  it("Should emit immediately when debounce time is 0", async () => {
    const injector = TestBed.inject(EnvironmentInjector);
    const source = signal('initial');
    const debounced = runInInjectionContext(injector, () => 
      debouncedSignal(source, 'initial', 0)
    );

    source.set('initiall');
    await vi.runAllTimersAsync();
    expect(debounced()).toBe('initiall');
  });

  it("Should debounce multiple updates correctly", async () => {
    const injector = TestBed.inject(EnvironmentInjector);
    const source = signal('initial');
    const debounced = runInInjectionContext(injector, () => 
      debouncedSignal(source, 'initial', 100)
    );

    source.set('a');
    await vi.advanceTimersByTimeAsync(100);
    expect(debounced()).toBe('a');

    source.set('b');
    await vi.advanceTimersByTimeAsync(100);
    expect(debounced()).toBe('b');

    source.set('c');
    await vi.advanceTimersByTimeAsync(100);
    expect(debounced()).toBe('c');
  });
});
