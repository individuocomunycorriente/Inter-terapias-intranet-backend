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

/** Formato de lectura: "12.345.678-9". Si el RUT es inválido, devuelve el valor original. */
export function formatRut(rut: string): string {
  const clean = cleanRut(rut);
  if (clean.length < 2) return rut;

  const body = clean.slice(0, -1);
  const checkDigit = clean.slice(-1);
  const withDots = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${withDots}-${checkDigit}`;
}
