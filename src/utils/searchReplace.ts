export const findReplace = (
  lines: string[],
  find: string,
  replace: string
) => {
  if (!find) return lines;

  return lines.map(l => l.split(find).join(replace));
};