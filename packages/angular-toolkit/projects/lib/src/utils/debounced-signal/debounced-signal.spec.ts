/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { TestScheduler } from 'rxjs/testing';
import { throttleTime } from 'rxjs';

describe("debouncedSignal", () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).deep.equal(expected);
  });

  // This test runs synchronously.
  it('generates the stream correctly', () => {
    testScheduler.run((helpers) => {
      const { cold, time, expectObservable, expectSubscriptions } = helpers;
      const e1 = cold(' -a--b--c---|');
      const e1subs = '  ^----------!';
      const t = time('   ---|       '); // t = 3
      const expected = '-a-----c---|';
  
      expectObservable(e1.pipe(throttleTime(t))).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });
});