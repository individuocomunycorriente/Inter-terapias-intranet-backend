import apiClient from '../client';
import type { ListParams, Paginated, Patient, PatientFile } from '../../types';

export interface PatientInput {
  fullName: string;
  rut: string;
  age: number;
  contactPhone?: string;
  guardianName?: string;
}

export const listPatients = async (params: ListParams = {}): Promise<Paginated<Patient>> => {
  const { data } = await apiClient.get<Paginated<Patient>>('/patients', { params });
  return data;
};

export const getPatientFile = async (id: number): Promise<PatientFile> => {
  const { data } = await apiClient.get<PatientFile>(`/patients/${id}/file`);
  return data;
};

export const createPatient = async (input: PatientInput): Promise<Patient> => {
  const { data } = await apiClient.post('/admin/patients', input);
  return data.patient;
};

export const updatePatient = async (id: number, input: Partial<PatientInput>): Promise<Patient> => {
  const { data } = await apiClient.put(`/admin/patients/${id}`, input);
  return data.patient;
};

export const deletePatient = async (id: number): Promise<void> => {
  await apiClient.delete(`/admin/patients/${id}`);
};
