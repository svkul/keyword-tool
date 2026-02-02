import {
  toUpperCase,
  toLowerCase,
  capitalizeEachWord,
  capitalizeFirstWord,
} from "./case";
import {
  trimSpaces,
  removeTabs,
  removeAfterDash,
  spacesToUnderscore,
} from "./cleanup";
import {
  addPlusBeforeWords,
  removePlus,
  wrapWithQuotes,
  wrapWithBrackets,
  addDash,
  removeDash,
  addDashBrackets,
  addDashQuotes,
  removeSpecialChars,
  replaceSpecialCharsWithSpace,
} from "./symbols";
import { findReplace } from "./searchReplace";
import { sortAZ, sortZA, uniqueLines } from "./sort";

const toTextTransform =
  (fn: (lines: string[]) => string[]) =>
  (text: string): string =>
    fn(text.split("\n")).join("\n");

export type Op =
  | { type: "lowercase" }
  | { type: "uppercase" }
  | { type: "capitalizeEachWord" }
  | { type: "capitalizeFirstWord" }
  | { type: "trim" }
  | { type: "removeTabs" }
  | { type: "removeAfterDash" }
  | { type: "spacesToUnderscore" }
  | { type: "removeSpecialChars" }
  | { type: "replaceSpecialCharsWithSpace" }
  | { type: "unique" }
  | { type: "sortAz"; locale?: string }
  | { type: "sortZa"; locale?: string }
  | { type: "addPlusBeforeWords" }
  | { type: "removePlus" }
  | { type: "wrapWithQuotes" }
  | { type: "wrapWithBrackets" }
  | { type: "addDash" }
  | { type: "removeDash" }
  | { type: "addDashBrackets" }
  | { type: "addDashQuotes" }
  | { type: "findReplace"; find: string; replace: string };

export function applyOperation(text: string, op: Op): string {
  switch (op.type) {
    case "lowercase":
      return toTextTransform(toLowerCase)(text);
    case "uppercase":
      return toTextTransform(toUpperCase)(text);
    case "capitalizeEachWord":
      return toTextTransform(capitalizeEachWord)(text);
    case "capitalizeFirstWord":
      return toTextTransform(capitalizeFirstWord)(text);
    case "trim":
      return toTextTransform(trimSpaces)(text);
    case "removeTabs":
      return toTextTransform(removeTabs)(text);
    case "removeAfterDash":
      return toTextTransform(removeAfterDash)(text);
    case "spacesToUnderscore":
      return toTextTransform(spacesToUnderscore)(text);
    case "removeSpecialChars":
      return toTextTransform(removeSpecialChars)(text);
    case "replaceSpecialCharsWithSpace":
      return toTextTransform(replaceSpecialCharsWithSpace)(text);
    case "unique":
      return toTextTransform(uniqueLines)(text);
    case "sortAz":
      return toTextTransform((lines) => sortAZ(lines, op.locale ?? "uk"))(text);
    case "sortZa":
      return toTextTransform((lines) => sortZA(lines, op.locale ?? "uk"))(text);
    case "addPlusBeforeWords":
      return toTextTransform(addPlusBeforeWords)(text);
    case "removePlus":
      return toTextTransform(removePlus)(text);
    case "wrapWithQuotes":
      return toTextTransform(wrapWithQuotes)(text);
    case "wrapWithBrackets":
      return toTextTransform(wrapWithBrackets)(text);
    case "addDash":
      return toTextTransform(addDash)(text);
    case "removeDash":
      return toTextTransform(removeDash)(text);
    case "addDashBrackets":
      return toTextTransform(addDashBrackets)(text);
    case "addDashQuotes":
      return toTextTransform(addDashQuotes)(text);
    case "findReplace":
      return toTextTransform((lines) =>
        findReplace(lines, op.find, op.replace),
      )(text);
    default:
      return text;
  }
}

export function processTextInline(text: string, ops: Op[]): string {
  return ops.reduce((acc, op) => applyOperation(acc, op), text);
}

const LINES_THRESHOLD = 5000;
const BATCH_SIZE_THRESHOLD = 3;

export function shouldUseWorker(text: string, ops: Op[]): boolean {
  const linesCount = text.split("\n").length;
  return linesCount > LINES_THRESHOLD || ops.length > BATCH_SIZE_THRESHOLD;
}
