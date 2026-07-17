// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Validaciones básicas de entrada
    if (!email || !password) {
      res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
      return;
    }

    // 2. Validación obligatoria del dominio institucional (@interterapia.cl)
    if (!email.endsWith('@interterapia.cl')) {
      res.status(403).json({ 
        message: 'Acceso exclusivo con correo institucional (@interterapia.cl).' 
      });
      return;
    }

    let userFound = null;
    let userRole: 'admin' | 'professional' = 'professional';

    // 3. Estrategia de búsqueda en cascada
    // Primero verificamos si es un Administrador
    const administrator = await prisma.administrator.findUnique({
      where: { email },
    });

    if (administrator) {
      userFound = administrator;
      userRole = 'admin';
    } else {
      // Si no es admin, buscamos si es un Profesional
      const professional = await prisma.professional.findUnique({
        where: { email },
      });
      if (professional) {
        userFound = professional;
        userRole = 'professional';
      }
    }

    // 4. Si el correo no existe en ninguna de las dos tablas
    if (!userFound) {
      res.status(401).json({ message: 'Credenciales inválidas.' });
      return;
    }

    // 5. Validación de la contraseña encriptada
    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Credenciales inválidas.' });
      return;
    }

    // 6. Firma del Token JWT (Incluimos el 'role' en el payload para los middlewares)
    const token = jwt.sign(
      { 
        id: userFound.id, 
        email: userFound.email, 
        role: userRole,
        // Si es profesional guardamos su especialidad, si es admin queda como undefined
        specialty: userRole === 'professional' ? (userFound as any).specialty : undefined
      },
      JWT_SECRET,
      { expiresIn: '8h' } // El token expira en 8 horas
    );

    // 7. Configuración e Inyección de la Cookie HttpOnly (Seguridad Avanzada)
    res.cookie('token', token, {
      httpOnly: true, // 🔒 Inaccesible para scripts maliciosos de JavaScript en el navegador
      secure: process.env.NODE_ENV === 'production', // Solo viaja por HTTPS en producción
      sameSite: 'lax', // Protección nativa contra ataques CSRF
      maxAge: 1000 * 60 * 60 * 8, // Tiempo de vida coincidente con el JWT (8 horas)
    });

    // 8. Respuesta estructurada según el rol (Mapea perfecto con lo que espera tu Front)
    if (userRole === 'admin') {
      res.json({
        message: 'Autenticación exitosa como Administrador',
        administrator: {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
          role: 'admin'
        }
      });
    } else {
      res.json({
        message: 'Autenticación exitosa como Profesional',
        professional: {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
          specialty: (userFound as any).specialty,
          imageUrl: (userFound as any).imageUrl,
          role: 'professional'
        }
      });
    }

  } catch (error: any) {
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

export const registerProfessional = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, specialty, imageUrl } = req.body;

    if (!name || !email || !password || !specialty) {
      res.status(400).json({ message: 'Faltan campos requeridos.' });
      return;
    }

    if (!email.endsWith('@interterapia.cl')) {
      res.status(400).json({ message: 'El correo debe pertenecer al dominio @interterapia.cl' });
      return;
    }

    const existing = await prisma.professional.findUnique({ where: { email } });
    if (existing) {
      res.status(400).json({ message: 'El profesional ya se encuentra registrado.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newProfessional = await prisma.professional.create({
      data: {
        name,
        email,
        password: hashedPassword,
        specialty,
        imageUrl
      }
    });

    res.status(201).json({
      message: 'Profesional registrado con éxito',
      professional: {
        id: newProfessional.id,
        name: newProfessional.name,
        email: newProfessional.email,
        specialty: newProfessional.specialty
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al registrar profesional', error: error.message });
  }
};