
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VehicleType, RentalPlan } from "@/types";
import { calculatePrice } from "@/utils/pricing";

interface VehicleCardProps {
  vehicle: VehicleType;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const [selectedPlan, setSelectedPlan] = useState<RentalPlan>("12hour");
  const [withDriver, setWithDriver] = useState(false);

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlan(e.target.value as RentalPlan);
  };

  const handleDriverChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWithDriver(e.target.value === "with");
  };

  const price = calculatePrice(vehicle.type, selectedPlan, withDriver);

  // Clear any potential booking state from localStorage on component mount
  useEffect(() => {
    if (localStorage.getItem("recentBooking")) {
      localStorage.removeItem("recentBooking");
    }
  }, []);

  return (
    <div className="vehicle-card">
      {/* Vehicle Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.name}`}
          className="w-full h-full object-cover"
        />
        {!vehicle.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-1 rounded-full font-medium text-sm">
              Not Available
            </span>
          </div>
        )}
        {/* Added availability badge for available vehicles */}
        {vehicle.available && (
          <div className="absolute top-0 right-0 m-3">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Available
            </span>
          </div>
        )}
      </div>

      {/* Vehicle Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{vehicle.brand} {vehicle.name}</h3>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
            {vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}
          </span>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <i className="fas fa-map-marker-alt mr-1"></i>
          <span className="text-sm">{vehicle.location}</span>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-gray-600">
            <i className="fas fa-users mr-1"></i>
            <span className="text-sm">{vehicle.seatingCapacity} Seats</span>
          </div>
          <div className="text-lg font-bold text-primary">
            PKR {price.toLocaleString()}
          </div>
        </div>

        {/* Rental Options */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Rental Plan</label>
            <select
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
              value={selectedPlan}
              onChange={handlePlanChange}
              disabled={!vehicle.available}
            >
              <option value="12hour">12 Hour</option>
              <option value="2day">2 Day</option>
              <option value="3day">3 Day</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Driver Option</label>
            <select
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
              value={withDriver ? "with" : "without"}
              onChange={handleDriverChange}
              disabled={!vehicle.available}
            >
              <option value="without">Without Driver</option>
              <option value="with">With Driver</option>
            </select>
          </div>
        </div>

        {/* Book Button - Changed to Link to new booking page */}
        <Link 
          to={vehicle.available ? `/booking/${vehicle.id}?plan=${selectedPlan}&driver=${withDriver ? 'true' : 'false'}` : "#"}
          className={`w-full py-2 px-4 rounded font-medium text-center block ${
            vehicle.available 
              ? "bg-primary text-white hover:bg-primary-dark transition-colors"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={(e) => !vehicle.available && e.preventDefault()}
        >
          {vehicle.available ? "Book Now" : "Not Available"}
        </Link>

        {/* Features Preview */}
        <div className="mt-3 flex flex-wrap gap-1">
          {vehicle.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
            >
              {feature}
            </span>
          ))}
          {vehicle.features.length > 3 && (
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              +{vehicle.features.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
