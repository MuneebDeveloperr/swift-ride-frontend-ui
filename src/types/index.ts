
// User and Profile types
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  profile?: UserProfile;
}

export interface UserProfile {
  name: string;
  email: string;
  dob?: string;
  gender?: string;
  cnic?: string;
  province?: string;
  city?: string;
  postalCode?: string;
}

// Vehicle related types
export interface VehicleType {
  id: string;
  name: string;
  brand: string;
  category: 'car' | 'bus' | 'minibus' | 'coaster';
  price: number;
  seats: number;
  transmission: 'manual' | 'automatic';
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  features: string[];
  image: string;
  availability: boolean;
  rating: number;
  reviews: number;
}

// Booking related types
export type RentalPlan = '12hour' | '2day' | '3day';

export interface BookingFormData {
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  rentalPlan: RentalPlan;
  withDriver: boolean;
  specialInstructions?: string;
}

export interface Booking {
  id: string;
  userId: string;
  vehicleId: string;
  vehicleName: string;
  vehicleBrand: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDateTime: string;
  returnDateTime: string;
  rentalPlan: RentalPlan;
  withDriver: boolean;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

// Chat related types
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: string;
}
