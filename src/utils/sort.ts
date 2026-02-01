export const sortAZ = (lines: string[], locale = 'uk') =>
  [...lines].sort((a, b) => a.localeCompare(b, locale));

export const sortZA = (lines: string[], locale = 'uk') =>
  [...lines].sort((a, b) => b.localeCompare(a, locale));

export const uniqueLines = (lines: string[]) =>
  Array.from(new Set(lines));