export function containsChineseCharacters(text: string): boolean {
  const chineseRegex = /\p{Script=Han}/u;
  return chineseRegex.test(text);
}
