import apiClient from '../client';
import type { ListParams, Paginated, Professional, PublicProfessional } from '../../types';

/** Listado público de difusión (sin autenticación), usado por el sitio informativo. */
export const getPublicProfessionals = async (): Promise<PublicProfessional[]> => {
  const { data } = await apiClient.get<PublicProfessional[]>('/public/professionals');
  return data;
};

export interface ProfessionalInput {
  name: string;
  email: string;
  password?: string;
  specialty: string;
  imageUrl?: string;
}

export type OwnProfileInput = Partial<Omit<ProfessionalInput, 'email'>>;

/** Directorio de la intranet — cualquier rol autenticado puede listar/ver. */
export const listProfessionalsDirectory = async (params: ListParams = {}): Promise<Paginated<Professional>> => {
  const { data } = await apiClient.get<Paginated<Professional>>('/professionals', { params });
  return data;
};

export const getProfessionalById = async (id: number): Promise<Professional> => {
  const { data } = await apiClient.get<Professional>(`/professionals/${id}`);
  return data;
};

/** El profesional autenticado edita su propio perfil (sin correo). */
export const updateOwnProfile = async (input: OwnProfileInput): Promise<Professional> => {
  const { data } = await apiClient.put('/professionals/me', input);
  return data.professional;
};

export const createProfessional = async (input: ProfessionalInput): Promise<Professional> => {
  const { data } = await apiClient.post('/admin/professionals', input);
  return data.professional;
};

export const updateProfessional = async (
  id: number,
  input: Partial<ProfessionalInput>
): Promise<Professional> => {
  const { data } = await apiClient.put(`/admin/professionals/${id}`, input);
  return data.professional;
};

export const deleteProfessional = async (id: number): Promise<void> => {
  await apiClient.delete(`/admin/professionals/${id}`);
};
