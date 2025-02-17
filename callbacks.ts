/** This module is browser compatible. */

/** Creates a function that returns the instance the method was called on. */
// deno-lint-ignore no-explicit-any
export function returnsThis<T>(): (...args: any[]) => ThisType<T> {
  return function <T>(this: T): ThisType<T> {
    return this;
  };
}

/** Creates a function that returns one of its arguments. */
// deno-lint-ignore no-explicit-any
export function returnsArg(idx: number): (...args: any[]) => unknown {
  return function () {
    return arguments[idx];
  };
}

/** Creates a function that returns its arguments or a subset of them. If end is specified, it will return arguments up to but not including the end. */
export function returnsArgs(
  start = 0,
  end?: number,
  // deno-lint-ignore no-explicit-any
): (...args: any[]) => unknown {
  return function () {
    return Array.prototype.slice.call(arguments, start, end);
  };
}

export function returnsNext<T>(
  iterable: Iterable<T>,
  // deno-lint-ignore no-explicit-any
): (...args: any[]) => (T | void) {
  const gen = (function* returnsValue() {
    yield* iterable;
  })();
  return function () {
    return gen.next().value;
  };
}

export function resolvesNext<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  // deno-lint-ignore no-explicit-any
): (...args: any[]) => Promise<T | void> {
  const gen = (async function* returnsValue() {
    yield* iterable;
  })();
  return async () => (await gen.next()).value;
}
