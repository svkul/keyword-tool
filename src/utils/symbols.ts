const SPECIAL_CHARS = /[()\\~!@#$%^&*_=+[\]{}|;':",/<>?`]/g;

export const addPlusBeforeWords = (lines: string[]) =>
  lines.map(l =>
    l.replace(/\b(\p{L}+)/gu, '+$1')
  );

export const removePlus = (lines: string[]) =>
  lines.map(l => l.replace(/\+/g, ''));

export const wrapWithQuotes = (lines: string[]) =>
  lines.map(l => `"${l}"`);

export const wrapWithBrackets = (lines: string[]) =>
  lines.map(l => `[${l}]`);

export const addDash = (lines: string[]) =>
  lines.map(l => `-${l}`);

export const removeDash = (lines: string[]) =>
  lines.map(l => l.replace(/-/g, ''));

export const addDashBrackets = (lines: string[]) =>
  lines.map(l => `-[${l}]`);

export const addDashQuotes = (lines: string[]) =>
  lines.map(l => `-"${l}"`);


export const removeSpecialChars = (lines: string[]) =>
  lines.map(l => l.replace(SPECIAL_CHARS, ''));

export const replaceSpecialCharsWithSpace = (lines: string[]) =>
  lines.map(l => l.replace(SPECIAL_CHARS, ' '));