// src/controllers/professional.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { prisma } from '../db';
import { AppError } from '../utils/AppError';
import { parseId } from '../utils/parseId';
import { parsePagination, parseSearch } from '../utils/pagination';

const PROFESSIONAL_DETAIL_FIELDS = {
  id: true,
  name: true,
  email: true,
  specialty: true,
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
} as const;

// Listado público de difusión (sin autenticación) — solo campos no sensibles
export const getPublicProfessionals = async (req: Request, res: Response): Promise<void> => {
  const professionals = await prisma.professional.findMany({
    select: { id: true, name: true, specialty: true, imageUrl: true },
    orderBy: { name: 'asc' },
  });
  res.json(professionals);
};

// Directorio para la intranet (cualquier rol autenticado), paginado y con búsqueda
export const listProfessionalsDirectory = async (req: Request, res: Response): Promise<void> => {
  const { page, pageSize, skip, take } = parsePagination(req.query);
  const search = parseSearch(req.query);

  const where: Prisma.ProfessionalWhereInput = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { specialty: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};

  const [items, total] = await Promise.all([
    prisma.professional.findMany({ where, select: PROFESSIONAL_DETAIL_FIELDS, orderBy: { name: 'asc' }, skip, take }),
    prisma.professional.count({ where }),
  ]);

  res.json({ items, total, page, pageSize });
};

// Detalle de un profesional puntual (cualquier rol autenticado)
export const getProfessionalById = async (req: Request, res: Response): Promise<void> => {
  const id = parseId(req.params.id);

  const professional = await prisma.professional.findUnique({
    where: { id },
    select: PROFESSIONAL_DETAIL_FIELDS,
  });

  if (!professional) {
    throw new AppError(404, 'Profesional no encontrado.');
  }

  res.json(professional);
};

// El propio profesional edita su perfil — nunca un :id de la URL, siempre req.user.id
export const updateOwnProfile = async (req: Request, res: Response): Promise<void> => {
  const { name, specialty, imageUrl, password } = req.body;

  const data: Prisma.ProfessionalUpdateInput = {};
  if (name !== undefined) data.name = name;
  if (specialty !== undefined) data.specialty = specialty;
  if (imageUrl !== undefined) data.imageUrl = imageUrl || null;
  if (password) data.password = await bcrypt.hash(password, 10);

  const professional = await prisma.professional.update({
    where: { id: req.user!.id },
    data,
    select: PROFESSIONAL_DETAIL_FIELDS,
  });

  res.json({ message: 'Perfil actualizado con éxito.', professional });
};
