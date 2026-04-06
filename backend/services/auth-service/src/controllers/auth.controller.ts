import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { OTPService } from '../services/otp.service';
import { pool } from '../config/postgres';
import { redis } from '../config/redis';
import { signToken, JwtPayload } from '../utils/jwt';

type UserRole = 'hirer' | 'driver';

interface DbUser {
  id: string;
  phone: string;
  role: UserRole;
}

interface AuthUser {
  userId: string;
  phone: string;
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

export const verifyOTP = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    console.log('1. verify-otp request received');

    const { phone, otp } = req.body as { phone?: string; otp?: string };

    if (!phone || !otp) {
      return res.status(400).json({ message: 'Phone and otp are required' });
    }

    const otpKey = `otp:${phone}`;
    const storedOtp = await redis.get(otpKey);
    console.log('2. OTP fetched from Redis:', storedOtp);

    if (!storedOtp) {
      return res.status(400).json({ message: 'OTP expired or not found' });
    }

    if (storedOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    console.log('3. OTP matched');

    console.log('4. DB query start');
    const existingUserResult = await pool.query<DbUser>(
      'SELECT * FROM users WHERE phone = $1',
      [phone]
    );

    let user = existingUserResult.rows[0];

    if (!user) {
      const newUserResult = await pool.query<DbUser>(
        "INSERT INTO users (id, phone, role) VALUES ($1, $2, 'hirer') RETURNING *",
        [uuidv4(), phone]
      );
      user = newUserResult.rows[0];
    }
    console.log('5. DB query end');

    await redis.del(otpKey);

    const payload: JwtPayload = {
      userId: user.id,
      role: 'hirer',
    };

    const token = signToken(payload);
    console.log('6. Token generated');

    console.log('7. Response sent');
    return res.status(200).json({
      message: 'Login success',
      token,
      user: {
        userId: user.id,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('verify-otp error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
