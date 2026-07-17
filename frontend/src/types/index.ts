export type Role = 'admin' | 'professional';

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ListParams {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  specialty?: string;
  imageUrl?: string | null;
}

export interface Professional {
  id: number;
  name: string;
  email: string;
  specialty: string;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Forma reducida que devuelve el endpoint público (sin correo ni fechas). */
export interface PublicProfessional {
  id: number;
  name: string;
  specialty: string;
  imageUrl?: string | null;
}

export interface Patient {
  id: number;
  fullName: string;
  rut: string;
  age: number;
  contactPhone?: string | null;
  guardianName?: string | null;
  initialSurveyData?: unknown;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClinicalReport {
  id: number;
  patientId: number;
  professionalId: number;
  professional?: { id: number; name: string; specialty: string };
  date: string;
  therapeuticGoal: string;
  activityPerformed: string;
  goalsAchieved: string;
  clinicalObservations: string;
  behaviorObservation: string;
  additionalComments?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PatientFile extends Patient {
  clinicalReports: ClinicalReport[];
}
