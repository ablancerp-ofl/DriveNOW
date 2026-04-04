import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { OTPService } from '../services/otp.service';
import { signToken, JwtPayload } from '../utils/jwt';

type UserRole = 'hirer' | 'driver';

interface MockUser {
  userId: string;
  role: UserRole;
}

export const sendOTP = async (req: Request, res: Response): Promise<void> => {
  const { phone } = req.body as { phone?: string };

  if (!phone) {
    res.status(400).json({ message: 'Phone is required' });
    return;
  }

  const otp = await OTPService.sendOTP(phone);
  res.status(200).json({ message: 'OTP sent', otp });
};

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  const { phone, otp } = req.body as { phone?: string; otp?: string };

  if (!phone || !otp) {
    res.status(400).json({ message: 'Phone and otp are required' });
    return;
  }

  const isValidOtp = await OTPService.verifyOTP(phone, otp);

  if (!isValidOtp) {
    res.status(400).json({ message: 'Invalid OTP' });
    return;
  }

  const user: MockUser = {
    userId: uuidv4(),
    role: 'hirer',
  };

  const payload: JwtPayload = {
    userId: user.userId,
    role: user.role,
  };

  const token = signToken(payload);

  res.status(200).json({
    message: 'Login success',
    token,
    user,
  });
};
