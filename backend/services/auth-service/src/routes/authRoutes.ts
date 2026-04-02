import { Router } from 'express';
import { sendOTP, verifyOTP } from '../controllers/authController';
import { validateSendOTP, validateVerifyOTP } from '../validators/authValidators';

const router = Router();

router.post('/send-otp', validateSendOTP, sendOTP);
router.post('/verify-otp', validateVerifyOTP, verifyOTP);

export default router;