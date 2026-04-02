import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Schemas
const sendOTPSchema = z.object({
  phoneNumber: z.string().min(10).max(15),
});

const verifyOTPSchema = z.object({
  phoneNumber: z.string().min(10).max(15),
  otp: z.string().length(6),
});

// Validators
export const validateSendOTP = (req: Request, res: Response, next: NextFunction) => {
  try {
    sendOTPSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
};

export const validateVerifyOTP = (req: Request, res: Response, next: NextFunction) => {
  try {
    verifyOTPSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
};