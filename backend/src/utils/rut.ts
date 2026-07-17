export function cleanRut(rut: string): string {
  return rut.replace(/[.\s-]/g, '').toUpperCase();
}

export function isValidRut(rut: string): boolean {
  const clean = cleanRut(rut);
  if (!/^\d{7,8}[0-9K]$/.test(clean)) return false;

  const body = clean.slice(0, -1);
  const checkDigit = clean.slice(-1);

  let sum = 0;
  let multiplier = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = 11 - (sum % 11);
  const expectedDigit = remainder === 11 ? '0' : remainder === 10 ? 'K' : String(remainder);

  return checkDigit === expectedDigit;
}

/** Formato canónico de almacenamiento: sin puntos, con guión, ej. "12345678-9". */
export function normalizeRut(rut: string): string {
  const clean = cleanRut(rut);
  return `${clean.slice(0, -1)}-${clean.slice(-1)}`;
}
