export const trimSpaces = (lines: string[]) =>
  lines.map((l) => l.replace(/\s+/gu, " ").trim());

export const removeTabs = (lines: string[]) =>
  lines.map((l) => l.replace(/\t/g, ""));

export const removeAfterDash = (lines: string[]) =>
  lines.map((l) => l.replace(/\s-.*$/u, ""));

export const spacesToUnderscore = (lines: string[]) =>
  lines.map((l) => l.replace(/\s/gu, "_"));