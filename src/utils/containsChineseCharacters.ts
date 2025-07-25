export function containsChineseCharacters(text: string): boolean {
  // Unicode ranges for Chinese characters
  // \u4e00-\u9fff: CJK Unified Ideographs (Basic)
  // \u3400-\u4dbf: CJK Unified Ideographs Extension A
  // \u20000-\u2a6df: CJK Unified Ideographs Extension B
  // \u2a700-\u2b73f: CJK Unified Ideographs Extension C
  // \u2b740-\u2b81f: CJK Unified Ideographs Extension D
  // \u2b820-\u2ceaf: CJK Unified Ideographs Extension E
  // \uf900-\ufaff: CJK Compatibility Ideographs
  const chineseRegex = /\p{Script=Han}/u;
  return chineseRegex.test(text);
}
