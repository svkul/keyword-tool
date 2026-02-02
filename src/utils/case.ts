export const toUpperCase = (lines: string[]) =>
  lines.map(l => l.toUpperCase());

export const toLowerCase = (lines: string[]) =>
  lines.map(l => l.toLowerCase());

export const capitalizeEachWord = (lines: string[]) =>
  lines.map(l =>
    l.replace(/\b\p{L}/gu, char => char.toUpperCase())
  );

export const capitalizeFirstWord = (lines: string[]) =>
  lines.map(l => {
    const lowercased = l.toLowerCase();
    return lowercased.replace(/^\s*\p{L}/u, char => char.toUpperCase());
  });