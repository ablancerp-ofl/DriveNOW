import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  userId?: string;
  token?: string;
}

// Placeholder for JWT verification middleware
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // TODO: Extract and verify JWT token from Authorization header
    // const token = req.headers.authorization?.split(' ')[1];
    // if (!token) return res.status(401).json({ message: 'No token provided' });
    // const decoded = TokenService.verifyToken(token);
    // req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authMiddleware;
