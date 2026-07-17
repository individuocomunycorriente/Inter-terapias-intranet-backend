import { z } from 'zod';
import { isValidRut, normalizeRut } from '../utils/rut';

const rutSchema = z.string().min(1, 'El RUT es obligatorio.').refine(isValidRut, 'RUT inválido.').transform(normalizeRut);

export const createPatientSchema = z.object({
  fullName: z.string().min(1, 'El nombre completo es obligatorio.'),
  rut: rutSchema,
  age: z.coerce.number().int().min(0, 'La edad debe ser un número válido.'),
  contactPhone: z.string().optional().or(z.literal('')),
  guardianName: z.string().optional().or(z.literal('')),
  initialSurveyData: z.unknown().optional(),
});

export const updatePatientSchema = z.object({
  fullName: z.string().min(1).optional(),
  rut: rutSchema.optional(),
  age: z.coerce.number().int().min(0).optional(),
  contactPhone: z.string().optional().or(z.literal('')),
  guardianName: z.string().optional().or(z.literal('')),
  initialSurveyData: z.unknown().optional(),
});
