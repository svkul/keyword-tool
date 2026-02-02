/** Collapse any Unicode whitespace to single space. /u makes \\s Unicode-aware (UA/RU/EN). */
export const trimSpaces = (lines: string[]) =>
  lines.map((l) => l.replace(/\s+/gu, " ").trim());

export const removeTabs = (lines: string[]) =>
  lines.map((l) => l.replace(/\t/g, ""));

/** Remove from " -" to end of line. . with /u matches any Unicode char. */
export const removeAfterDash = (lines: string[]) =>
  lines.map((l) => l.replace(/\s-.*$/u, ""));

/** Any Unicode whitespace to underscore. */
export const spacesToUnderscore = (lines: string[]) =>
  lines.map((l) => l.replace(/\s/gu, "_"));