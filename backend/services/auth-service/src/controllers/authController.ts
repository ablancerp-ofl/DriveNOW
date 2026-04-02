import { Request, Response } from 'express';

export const sendOTP = (req: Request, res: Response) => {
  // Placeholder: Implement OTP sending logic
  res.json({ message: 'OTP sent successfully' });
};

export const verifyOTP = (req: Request, res: Response) => {
  // Placeholder: Implement OTP verification logic
  res.json({ message: 'OTP verified successfully' });
};