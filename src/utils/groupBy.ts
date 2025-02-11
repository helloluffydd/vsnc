export const groupBy = <T, K extends PropertyKey>(
  array: T[],
  callback: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((acc, item) => {
    const key = callback(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
};
