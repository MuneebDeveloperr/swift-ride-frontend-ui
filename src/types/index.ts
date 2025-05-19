
export interface User {
  id: string;
  name: string;
  email: string;
  dateOfBirth?: string;
  gender?: "male" | "female";
  cnic?: string;
  province?: string;
  postalCode?: string;
  profileImage?: string;
}

export interface VehicleType {
  id: string;
  name: string;
  brand: string;
  type: "car" | "bus" | "minibus" | "coaster";
  image: string;
  seatingCapacity: number;
  pricePerHour: number;
  pricePerDay: number;
  location: string;
  features: string[];
  available: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  vehicleId: string;
  vehicleName: string;
  vehicleBrand: string;
  rentalPlan: "12hour" | "2day" | "3day";
  withDriver: boolean;
  pickupLocation: string;
  dropLocation: string;
  pickupDateTime: string;
  returnDateTime: string;
  totalPrice: number;
  status: "completed" | "upcoming" | "cancelled";
  createdAt: string;
}

export type RentalPlan = "12hour" | "2day" | "3day";

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDateTime: string;
  returnDateTime: string;
  vehicleCategory: "car" | "bus" | "minibus" | "coaster";
  rentalPlan: RentalPlan;
  withDriver: boolean;
  notes?: string;
  vehicleId?: string;
}

export interface PricingMatrix {
  [key: string]: {
    base: {
      "12hour": number;
      "2day": number;
      "3day": number;
    };
    driverCost: number;
  };
}

export interface Message {
  id: string;
  sender: "user" | "admin";
  content: string;
  timestamp: string;
}
