
import { RentalPlan } from "@/types";

// Pricing matrix based on the requirements
const pricingMatrix = {
  car: {
    base: {
      "12hour": 5000,
      "2day": 9500,
      "3day": 14000
    },
    driverCost: 1500
  },
  minibus: {
    base: {
      "12hour": 17000,
      "2day": 32000,
      "3day": 46000
    },
    driverCost: 2500
  },
  coaster: {
    base: {
      "12hour": 12000,
      "2day": 22500,
      "3day": 33000
    },
    driverCost: 2500
  },
  bus: {
    base: {
      "12hour": 25000,
      "2day": 48000,
      "3day": 70000
    },
    driverCost: 4000
  }
};

// Calculate price based on vehicle type, rental plan, and driver option
export const calculatePrice = (
  vehicleType: "car" | "bus" | "minibus" | "coaster",
  rentalPlan: RentalPlan,
  withDriver: boolean
): number => {
  // Get base price for this vehicle type and rental plan
  const basePrice = pricingMatrix[vehicleType].base[rentalPlan];
  
  // Add driver cost if needed
  let totalPrice = basePrice;
  if (withDriver) {
    // Driver cost adjustment based on rental plan
    let driverMultiplier = 1; // 12 hour
    if (rentalPlan === "2day") driverMultiplier = 2;
    if (rentalPlan === "3day") driverMultiplier = 3;
    
    totalPrice += pricingMatrix[vehicleType].driverCost * driverMultiplier;
  }
  
  return totalPrice;
};
