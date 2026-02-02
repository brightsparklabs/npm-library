/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { signal, runInInjectionContext, EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { debouncedSignal } from './debounced-signal';
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("debouncedSignal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should hold initialValue and debounce updates", () => {
    const injector = TestBed.inject(EnvironmentInjector);
    const source = signal('data');
    const debounced = runInInjectionContext(injector, () => 
      debouncedSignal(source, 'data', 100)
    );

    expect(debounced()).toBe('data');
    source.set('dataa');
    expect(debounced()).toBe('data');

    vi.advanceTimersByTime(50);
    expect(debounced()).toBe('data');

    vi.advanceTimersByTime(50);
    expect(debounced()).toBe('dataa');
  });

  it("Should handle dynamic debounce time via signal", () => {
    const injector = TestBed.inject(EnvironmentInjector);
    const source = signal('data');
    const timeDelay = signal(100);
    const debounced = runInInjectionContext(injector, () => 
      debouncedSignal(source, 'data', timeDelay)
    );

    source.set('dataa');
    vi.advanceTimersByTime(50);

    timeDelay.set(500);
    vi.advanceTimersByTime(100);
    expect(debounced()).toBe('data');

    vi.advanceTimersByTime(400);
    expect(debounced()).toBe('dataa');
  });
});