import json from 'secure-json-parse';

export function parseJson(stringifiedJson) {
  if (!stringifiedJson) return undefined;
  try {
    return json(stringifiedJson);
  } catch {
    return undefined;
  }
}
