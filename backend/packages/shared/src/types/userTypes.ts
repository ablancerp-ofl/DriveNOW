export interface User {
  id: string;
  phoneNumber: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  userType: 'driver' | 'hirer' | 'admin';
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends Omit<User, 'id' | 'createdAt' | 'updatedAt'> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
