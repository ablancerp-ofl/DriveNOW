const otpStore: Record<string, string> = {};

export class OTPService {
  static async generateOTP(_phone: string): Promise<string> {
    return '123456';
  }

  static async sendOTP(phone: string): Promise<string> {
    const otp = await this.generateOTP(phone);
    otpStore[phone] = otp;
    return otp;
  }

  static async verifyOTP(phone: string, otp: string): Promise<boolean> {
    const storedOtp = otpStore[phone];

    if (!storedOtp || storedOtp !== otp) {
      return false;
    }

    delete otpStore[phone];
    return true;
  }
}