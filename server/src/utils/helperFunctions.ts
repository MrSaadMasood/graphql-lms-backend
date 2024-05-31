import { z } from 'zod';

export function dateValidator(value: unknown) {
  return z.date({ invalid_type_error: 'expected date string' }).parse(value);
}

export function stringValidator(value: unknown) {
  if (typeof value === 'string' && value.length > 0) return value;
  throw new TypeError('Empty string is recieved');
}
