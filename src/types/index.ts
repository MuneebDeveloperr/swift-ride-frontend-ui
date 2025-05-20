
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
  type: 'car' | 'bus' | 'minibus' | 'coaster';
  image: string;
  seatingCapacity: number;
  pricePerHour: number;
  pricePerDay: number;
  location: string;
  features: string[];
  available: boolean;
  // Additional properties
  category?: 'car' | 'bus' | 'minibus' | 'coaster';
  price?: number;
  seats?: number;
  transmission?: 'manual' | 'automatic';
  fuelType?: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  availability?: boolean;
  rating?: number;
  reviews?: number;
  isPremium?: boolean;
}

// Booking related types
export type RentalPlan = '12hour' | '2day' | '3day';

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  pickupDateTime?: string;
  returnDateTime?: string;
  vehicleCategory?: 'car' | 'bus' | 'minibus' | 'coaster';
  rentalPlan: RentalPlan;
  withDriver: boolean;
  notes?: string;
  specialInstructions?: string;
  vehicleId?: string;
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
  sender: 'user' | 'system' | 'admin';
  timestamp: string;
  content?: string;
  text?: string;
}

// Location data types
export type Province = 'Punjab' | 'Sindh' | 'KPK' | 'Balochistan' | 'Islamabad Capital Territory' | 'Gilgit-Baltistan' | 'Azad Jammu & Kashmir';
export type City = string;
export type LocationData = Record<Province, City[]>;
