import { Request, Response } from 'express';

export const getMe = (req: Request, res: Response) => {
  // Placeholder: Get current user
  res.json({ user: { id: 1, name: 'John Doe' } });
};

export const updateProfile = (req: Request, res: Response) => {
  // Placeholder: Update user profile
  res.json({ message: 'Profile updated successfully' });
};