import { Router } from 'express';
import { getMe, updateProfile } from '../controllers/userController';

const router = Router();

router.get('/me', getMe);
router.patch('/profile', updateProfile);

export default router;