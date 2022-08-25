export function nextFrame(): Promise<void>;
export function nextFrame<T>(callback: () => T): Promise<T>;
export function nextFrame<T>(callback?: () => T) {
  return new Promise((resolve) =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() => resolve(callback?.()))
    )
  );
}

export function zip<T extends Iterable<unknown>[]>(...iterables: T) {
  const zipped = [];
  const itrs = iterables.map((iterable) => iterable[Symbol.iterator]());
  for (;;) {
    const row = [];
    for (const itr of itrs) {
      const { done, value } = itr.next();
      if (done)
        return zipped as {
          [K in keyof T]: T[K] extends Iterable<infer V> ? V : never;
        }[];
      row.push(value);
    }
    zipped.push(row);
  }
}
