import { readFileSync } from 'fs';

export const readFileFromSystem = (filePath: string) => {
  const contents = readFileSync(filePath, 'utf-8');
  return contents;
};
