// src/routes/professionals.routes.ts
import { Router } from 'express';
import { requireAuth, requireRole } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { listProfessionalsDirectory, getProfessionalById, updateOwnProfile } from '../controllers/professional.controller';
import { updateOwnProfileSchema } from '../validators/professional.validators';

const router = Router();

// Directorio de profesionales de la intranet — cualquier rol autenticado puede ver
router.use(requireAuth);

router.put('/professionals/me', requireRole('professional'), validate(updateOwnProfileSchema), updateOwnProfile);
router.get('/professionals', listProfessionalsDirectory);
router.get('/professionals/:id', getProfessionalById);

export default router;
