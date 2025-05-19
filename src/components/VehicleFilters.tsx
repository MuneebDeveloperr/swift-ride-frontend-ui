
import { useState, useEffect } from "react";

interface FiltersProps {
  vehicleType: "car" | "bus" | "minibus" | "coaster";
  brands: string[];
  locations: string[];
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  sortBy: string;
  brand: string;
  location: string;
  priceRange: [number, number];
}

const VehicleFilters = ({ vehicleType, brands, locations, onFilterChange }: FiltersProps) => {
  // Determine price ranges based on vehicle type
  const getPriceRange = (): [number, number] => {
    switch (vehicleType) {
      case "car":
        return [5000, 25000];
      case "bus":
        return [25000, 100000];
      case "minibus":
        return [17000, 70000];
      case "coaster":
        return [12000, 50000];
      default:
        return [5000, 100000];
    }
  };

  const initialPriceRange = getPriceRange();
  
  const [filters, setFilters] = useState<FilterState>({
    sortBy: "default",
    brand: "all",
    location: "all",
    priceRange: initialPriceRange,
  });

  const [priceInputs, setPriceInputs] = useState({
    min: initialPriceRange[0],
    max: initialPriceRange[1],
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    
    setPriceInputs((prev) => ({
      ...prev,
      [name]: numValue,
    }));
  };

  const applyPriceFilter = () => {
    // Ensure min is less than max
    const min = Math.min(priceInputs.min, priceInputs.max);
    const max = Math.max(priceInputs.min, priceInputs.max);
    
    setFilters((prev) => ({
      ...prev,
      priceRange: [min, max],
    }));
  };

  const resetFilters = () => {
    setFilters({
      sortBy: "default",
      brand: "all",
      location: "all",
      priceRange: initialPriceRange,
    });
    
    setPriceInputs({
      min: initialPriceRange[0],
      max: initialPriceRange[1],
    });
  };

  // Pass filter changes to parent component
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden text-primary"
        >
          {showFilters ? (
            <i className="fas fa-chevron-up"></i>
          ) : (
            <i className="fas fa-chevron-down"></i>
          )}
        </button>
      </div>

      <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="default">Recommended</option>
              <option value="price_low_high">Price: Low to High</option>
              <option value="price_high_low">Price: High to Low</option>
            </select>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <select
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand.toLowerCase()}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location.toLowerCase()}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range (PKR)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                name="min"
                value={priceInputs.min}
                onChange={handlePriceChange}
                min={0}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Min"
              />
              <span>-</span>
              <input
                type="number"
                name="max"
                value={priceInputs.max}
                onChange={handlePriceChange}
                min={0}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Max"
              />
              <button
                onClick={applyPriceFilter}
                className="bg-primary text-white px-3 py-2 rounded-md"
              >
                <i className="fas fa-check"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={resetFilters}
            className="text-primary hover:text-primary-dark text-sm flex items-center"
          >
            <i className="fas fa-redo-alt mr-1"></i> Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleFilters;
