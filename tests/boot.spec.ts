import { test, expect, vi } from 'vitest';

test('coverage: register polyfea on loaded event if the document is not yet ready', async () => {
  // given
  const w = globalThis as unknown as Window;
  vi.resetModules()

  const oldState = w.document.readyState;
  Object.defineProperty(w.document, 'readyState', {
    value: 'loading',
    configurable: true,
  });

  // when
  await import('../src/boot?v=' + Math.random()); 

  expect(globalThis.polyfea).not.toBeDefined();
  w.dispatchEvent(new Event('load'));
  // then
  expect(globalThis.polyfea).toBeDefined();

  // restore
  Object.defineProperty(w.document, 'readyState', {
    get: () => oldState,
    configurable: true,
  });
}, 15000);
