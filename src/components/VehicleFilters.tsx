
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

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

  const [sliderValue, setSliderValue] = useState<[number, number]>(initialPriceRange);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (value: number[]) => {
    if (value.length === 2) {
      const priceRange: [number, number] = [value[0], value[1]];
      setSliderValue(priceRange);
      setFilters(prev => ({
        ...prev,
        priceRange
      }));
    }
  };

  const resetFilters = () => {
    setFilters({
      sortBy: "default",
      brand: "all",
      location: "all",
      priceRange: initialPriceRange,
    });
    
    setSliderValue(initialPriceRange);
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
            <div className="relative">
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
              >
                <option value="default">Recommended</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
              </div>
            </div>
          </div>

          {/* Brand Filter - Fixed to open downward */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <div className="relative">
              <select
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
              >
                <option value="all">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand.toLowerCase()}>
                    {brand}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
              </div>
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="relative">
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
              >
                <option value="all">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location.toLowerCase()}>
                    {location}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
              </div>
            </div>
          </div>

          {/* Price Range - Improved with Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Price Range (PKR)
              </label>
              <div className="text-xs text-gray-500">
                {sliderValue[0].toLocaleString()} - {sliderValue[1].toLocaleString()}
              </div>
            </div>
            <div className="px-2 py-4">
              <Slider
                defaultValue={[initialPriceRange[0], initialPriceRange[1]]}
                value={[sliderValue[0], sliderValue[1]]}
                min={initialPriceRange[0]}
                max={initialPriceRange[1]}
                step={(initialPriceRange[1] - initialPriceRange[0]) / 100}
                onValueChange={handlePriceChange}
                className="my-4"
              />
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
