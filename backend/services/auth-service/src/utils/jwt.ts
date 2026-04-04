import jwt from 'jsonwebtoken';

export interface JwtPayload {
  userId: string;
  role: 'hirer' | 'driver';
}

const JWT_SECRET = 'supersecret';

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
