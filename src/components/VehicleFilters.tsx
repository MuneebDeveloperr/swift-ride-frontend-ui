
import { useState, useEffect } from "react";

interface VehicleFiltersProps {
  vehicleType: string;
  brands: string[];
  locations: string[];
  onFilterChange: (filters: any) => void;
}

const VehicleFilters = ({ vehicleType, brands, locations, onFilterChange }: VehicleFiltersProps) => {
  const [filters, setFilters] = useState({
    brands: [] as string[],
    locations: [] as string[],
    priceRange: { min: 0, max: 150000 },
    sortBy: "default",
    shareBooking: false,
    coRiderPhone: "",
    coRiderName: ""
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Brand options based on vehicle type
  const getBrandOptions = () => {
    switch (vehicleType) {
      case "car":
        return ["Toyota", "Honda", "Suzuki", "Hyundai", "Kia", "MG", "BMW", "Audi"];
      case "bus":
        return ["Yutong", "Hino", "Isuzu", "MAN"];
      case "minibus":
        return ["Yutong", "Hino", "Isuzu", "MAN"];
      case "coaster":
        return ["Toyota Coaster", "Higer Coaster", "Yutong Coaster"];
      default:
        return brands;
    }
  };

  const locationOptions = [
    "Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Islamabad",
    "Gujranwala", "Peshawar", "Multan", "Sialkot", "Quetta",
    "Bahawalpur", "Sargodha", "Mardan", "Gujrat", "Sheikhupura"
  ];

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleBrandChange = (brand: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      brands: checked 
        ? [...prev.brands, brand]
        : prev.brands.filter(b => b !== brand)
    }));
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      locations: checked 
        ? [...prev.locations, location]
        : prev.locations.filter(l => l !== location)
    }));
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
  };

  const handleSortChange = (sortValue: string) => {
    setFilters(prev => ({
      ...prev,
      sortBy: sortValue
    }));
  };

  const clearFilters = () => {
    const resetFilters = {
      brands: [] as string[],
      locations: [] as string[],
      priceRange: { min: 0, max: 150000 },
      sortBy: "default",
      shareBooking: false,
      coRiderPhone: "",
      coRiderName: ""
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

      {/* Sort By */}
      <div>
        <label className="form-label font-medium mb-3 block">Sort By</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.sortBy === "price_low_high"}
              onChange={(e) => handleSortChange(e.target.checked ? "price_low_high" : "default")}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mr-2"
            />
            <span className="text-sm">Low to High</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.sortBy === "price_high_low"}
              onChange={(e) => handleSortChange(e.target.checked ? "price_high_low" : "default")}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mr-2"
            />
            <span className="text-sm">High to Low</span>
          </label>
        </div>
      </div>

      {/* Brands Filter */}
      <div>
        <label className="form-label font-medium mb-3 block">Brands</label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {getBrandOptions().map(brand => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={(e) => handleBrandChange(brand, e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mr-2"
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Locations Filter */}
      <div>
        <label className="form-label font-medium mb-3 block">Locations</label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {locationOptions.map(location => (
            <label key={location} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.locations.includes(location)}
                onChange={(e) => handleLocationChange(location, e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mr-2"
              />
              <span className="text-sm">{location}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="form-label font-medium mb-3 block">Price Range (PKR)</label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number"
                placeholder="Min: 5000"
                value={filters.priceRange.min || ''}
                onChange={(e) => handlePriceChange('min', parseInt(e.target.value) || 0)}
                className="form-input w-full text-sm"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                placeholder="Max: 150000"
                value={filters.priceRange.max || ''}
                onChange={(e) => handlePriceChange('max', parseInt(e.target.value) || 150000)}
                className="form-input w-full text-sm"
              />
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Range: PKR {filters.priceRange.min.toLocaleString()} - PKR {filters.priceRange.max.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Share Booking Option - Fixed mobile layout */}
      <div className="border-t pt-4">
        <div className="flex items-center space-x-3 mb-4">
          <input
            type="checkbox"
            id="shareBooking"
            checked={filters.shareBooking}
            onChange={(e) => setFilters(prev => ({ ...prev, shareBooking: e.target.checked }))}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="shareBooking" className="text-sm font-medium text-gray-700">
            Share Booking with Co-Rider
          </label>
        </div>
        
        {/* Co-Rider Inputs - Fixed spacing for mobile */}
        {filters.shareBooking && (
          <div className="space-y-4">
            <div>
              <label className="form-label text-sm block mb-2">Co-rider Name</label>
              <input
                type="text"
                placeholder="Enter co-rider name"
                value={filters.coRiderName}
                onChange={(e) => setFilters(prev => ({ ...prev, coRiderName: e.target.value }))}
                className="form-input text-sm w-full"
              />
            </div>
            <div className="mb-4">
              <label className="form-label text-sm block mb-2">Co-rider Contact</label>
              <input
                type="tel"
                placeholder="Enter co-rider phone number"
                value={filters.coRiderPhone}
                onChange={(e) => setFilters(prev => ({ ...prev, coRiderPhone: e.target.value }))}
                className="form-input text-sm w-full"
              />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mt-2">
              Share your booking details with a co-rider for split costs and coordination.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters - Sticky positioning with proper scroll */}
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
