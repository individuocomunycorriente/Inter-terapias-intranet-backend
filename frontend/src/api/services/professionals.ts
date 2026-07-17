import apiClient from '../client';
import type { ListParams, Paginated, Professional, PublicProfessional } from '../../types';

/** Listado público de difusión (sin autenticación), usado por el sitio informativo. */
export const getPublicProfessionals = async (): Promise<PublicProfessional[]> => {
  const { data } = await apiClient.get<PublicProfessional[]>('/professionals');
  return data;
};

export interface ProfessionalInput {
  name: string;
  email: string;
  password?: string;
  specialty: string;
  imageUrl?: string;
}

export const listProfessionals = async (params: ListParams = {}): Promise<Paginated<Professional>> => {
  const { data } = await apiClient.get<Paginated<Professional>>('/admin/professionals', { params });
  return data;
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
