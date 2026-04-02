export interface Driver {
  id: string;
  userId: string;
  licenseNumber: string;
  licenseExpiry: Date;
  vehicleType: string;
  vehicleNumber: string;
  vehicleModel?: string;
  rating: number;
  totalRides: number;
  isAvailable: boolean;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface DriverProfile extends Omit<Driver, 'id' | 'createdAt' | 'updatedAt'> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
