
import { useState, useEffect } from "react";

interface VehicleFiltersProps {
  vehicleType: string;
  brands: string[];
  locations: string[];
  onFilterChange: (filters: any) => void;
}

const VehicleFilters = ({ vehicleType, brands, locations, onFilterChange }: VehicleFiltersProps) => {
  const [filters, setFilters] = useState({
    brand: "all",
    location: "all",
    priceRange: [0, 50000],
    sortBy: "default",
    shareBooking: false,
    coRiderPhone: ""
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    const resetFilters = {
      brand: "all",
      location: "all",
      priceRange: [0, 50000],
      sortBy: "default",
      shareBooking: false,
      coRiderPhone: ""
    };
    setFilters(resetFilters);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-primary hover:text-primary-dark mb-4"
        >
          Clear All Filters
        </button>
      </div>

      {/* Brand Filter */}
      <div>
        <label className="form-label">Brand</label>
        <select
          className="form-input"
          value={filters.brand}
          onChange={(e) => handleFilterChange("brand", e.target.value)}
        >
          <option value="all">All Brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand.toLowerCase()}>{brand}</option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div>
        <label className="form-label">Location</label>
        <select
          className="form-input"
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
        >
          <option value="all">All Locations</option>
          {locations.map(location => (
            <option key={location} value={location.toLowerCase()}>{location}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="form-label">Price Range (PKR per day)</label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={filters.priceRange[1]}
            onChange={(e) => handleFilterChange("priceRange", [0, parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>PKR 0</span>
            <span>PKR {filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="form-label">Sort By</label>
        <select
          className="form-input"
          value={filters.sortBy}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price_low_high">Price: Low to High</option>
          <option value="price_high_low">Price: High to Low</option>
        </select>
      </div>

      {/* Share Booking Option */}
      <div className="border-t pt-4">
        <div className="flex items-center space-x-3 mb-3">
          <input
            type="checkbox"
            id="shareBooking"
            checked={filters.shareBooking}
            onChange={(e) => handleFilterChange("shareBooking", e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="shareBooking" className="text-sm font-medium text-gray-700">
            Share Booking with Co-Rider
          </label>
        </div>
        
        {/* Co-Rider Phone Input - Fixed layout to prevent overlap */}
        {filters.shareBooking && (
          <div className="mt-3 space-y-2">
            <label className="form-label text-sm">Co-Rider Phone Number</label>
            <input
              type="tel"
              placeholder="Enter co-rider phone number"
              value={filters.coRiderPhone}
              onChange={(e) => handleFilterChange("coRiderPhone", e.target.value)}
              className="form-input text-sm"
            />
            <p className="text-xs text-gray-500 leading-relaxed">
              Share your booking details with a co-rider for split costs and coordination.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters - Sticky positioning */}
      <div className="hidden lg:block lg:w-72 flex-shrink-0">
        <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md max-h-[calc(100vh-6rem)] overflow-y-auto">
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full bg-primary text-white py-3 px-4 rounded-lg flex items-center justify-between"
        >
          <span>Filters</span>
          <i className={`fas fa-chevron-${showMobileFilters ? "up" : "down"}`}></i>
        </button>

        {/* Mobile Filters Dropdown */}
        {showMobileFilters && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md border">
            <FilterContent />
          </div>
        )}
      </div>
    </>
  );
};

export default VehicleFilters;
