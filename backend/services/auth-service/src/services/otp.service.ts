import { redis } from '../config/redis';

export class OTPService {
  static async generateOTP(_phone: string): Promise<string> {
    return '123456';
  }

  static async sendOTP(phone: string): Promise<string> {
    const otp = await this.generateOTP(phone);
    const key = `otp:${phone}`;
    // Store OTP in Redis with 300 seconds (5 minutes) TTL
    await redis.setex(key, 300, otp);
    return otp;
  }

  static async verifyOTP(phone: string, otp: string): Promise<boolean> {
    const key = `otp:${phone}`;
    const storedOtp = await redis.get(key);

    if (!storedOtp || storedOtp !== otp) {
      return false;
    }

    // Delete OTP from Redis after verification
    await redis.del(key);
    return true;
  }
}