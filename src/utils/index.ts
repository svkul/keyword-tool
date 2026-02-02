// Case transformations
export {
  toUpperCase,
  toLowerCase,
  capitalizeEachWord,
  capitalizeFirstWord,
} from './case';

// Cleanup operations
export {
  trimSpaces,
  removeTabs,
  removeAfterDash,
  spacesToUnderscore,
} from './cleanup';

// Symbol operations
export {
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
} from './symbols';

// Search and replace
export { findReplace } from './searchReplace';

// Sort and uniqueness
export {
  sortAZ,
  sortZA,
  uniqueLines,
} from './sort';

/** Converts a line-based transform to a text-based transform for use with applyBatch. */
export const toTextTransform =
  (fn: (lines: string[]) => string[]) =>
  (text: string): string =>
    fn(text.split('\n')).join('\n');
