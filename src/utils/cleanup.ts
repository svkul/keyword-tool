export const trimSpaces = (lines: string[]) =>
  lines.map(l =>
    l.replace(/\s+/g, ' ').trim()
  );

export const removeTabs = (lines: string[]) =>
  lines.map(l => l.replace(/\t/g, ''));

export const removeAfterDash = (lines: string[]) =>
  lines.map(l => l.replace(/\s-.*$/, ''));

export const spacesToUnderscore = (lines: string[]) =>
  lines.map(l => l.replace(/\s/g, '_'));