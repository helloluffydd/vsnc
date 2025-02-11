type NormalizedData<D, K extends PropertyKey = PropertyKey> = {
  set: K[];
  map: Record<K, D>;
};

export const normalizeBy = <T>(data: T[], key: keyof T): NormalizedData<T> => {
  return data.reduce(
    (a, v) => ({
      set: [...a.set, v[key] as unknown as PropertyKey],
      map: { ...a.map, [v[key] as unknown as PropertyKey]: v },
    }),
    { set: [], map: {} } as unknown as {
      set: PropertyKey[];
      map: Record<T[keyof T] extends PropertyKey ? T[keyof T] : PropertyKey, T>;
    }
  );
};
