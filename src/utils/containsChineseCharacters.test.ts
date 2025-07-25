import { expect, test } from "vitest";
import { containsChineseCharacters } from "./containsChineseCharacters";

test("containsChineseCharacters", () => {
  expect(containsChineseCharacters("你好")).toBe(true);
  expect(containsChineseCharacters("hello")).toBe(false);
  expect(containsChineseCharacters("中国")).toBe(true);
  expect(containsChineseCharacters("English")).toBe(false);
  expect(containsChineseCharacters("我爱你")).toBe(true);
  expect(containsChineseCharacters("123")).toBe(false);
  expect(containsChineseCharacters("你好世界")).toBe(true);
  expect(containsChineseCharacters("!@#$%")).toBe(false);
  expect(containsChineseCharacters("学习中文")).toBe(true);
  expect(containsChineseCharacters("Mixed文字Test")).toBe(true);
  expect(containsChineseCharacters("漢字")).toBe(true);
  expect(containsChineseCharacters("")).toBe(false);
  expect(containsChineseCharacters(" ")).toBe(false);
  expect(containsChineseCharacters("你 好")).toBe(true);
  expect(containsChineseCharacters("Hello 世界")).toBe(true);
  expect(containsChineseCharacters("  中  国  ")).toBe(true);
  expect(containsChineseCharacters("Text with 汉字 inside")).toBe(true);
  expect(containsChineseCharacters("   ")).toBe(false);
});
