// IS EMAIL ================================================================================================================================
const matcher = /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/;
export const isEmail = (value: string) => value.length <= 320 && matcher.test(value);

// FILL ====================================================================================================================================
export const fill = <V>(value: V) => {
	const a = 'YOUHOU';
	a;
  return <K extends string = string>(...keys: K[]): Record<K, V> => Object.fromEntries(keys.map((key) => [key, value])) as Record<K, V>;
};