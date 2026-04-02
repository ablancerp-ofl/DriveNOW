export interface Booking {
  id: string;
  hirerId: string;
  driverId?: string;
  pickupLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  dropoffLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  scheduledTime: Date;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  estimatedFare: number;
  actualFare?: number;
  distance?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingRequest {
  hirerId: string;
  pickupLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  dropoffLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  scheduledTime: Date;
}
