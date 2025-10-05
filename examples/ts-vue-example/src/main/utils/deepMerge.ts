export function deepMerge<T extends Record<PropertyKey, any>, U extends Partial<T>>(
  obj1: T,
  obj2: U
): T & U {
  const result = {} as T & U

  for (const key in obj2) {
    if (key in obj1) {
      // If both objects have this key
      if (
        typeof obj1[key] === 'object' &&
        obj1[key] !== null &&
        typeof obj2[key] === 'object' &&
        obj2[key] !== null
      ) {
        // Recursively merge if both values are non-null objects
        result[key] = deepMerge(obj1[key], obj2[key])
      } else {
        // Prefer obj1's value, even if it's `undefined` or `null`
        result[key] = obj1[key]
      }
    } else {
      // Use the value from obj2 (default) if obj1 doesn't have it
      // @ts-expect-error fuck u
      result[key] = obj2[key]
    }
  }

  // Copy over any remaining keys from obj1 that weren't in obj2
  for (const key in obj1) {
    if (!(key in result)) {
      result[key] = obj1[key]
    }
  }

  return result
}
