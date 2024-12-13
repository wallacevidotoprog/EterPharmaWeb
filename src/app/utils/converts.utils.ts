export function refineStringToNumber(value: string): string {
  return value.replace(/\D/g, '');
}
