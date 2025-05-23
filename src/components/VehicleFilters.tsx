
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
        return [5000, 36000];
      case "bus":
        return [25000, 144000];
      case "minibus":
        return [17000, 99000];
      case "coaster":
        return [12000, 73000];
      default:
        return [5000, 144000];
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
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("default");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSortOption(value);
    setFilters(prev => ({
      ...prev,
      sortBy: value
    }));
  };

  const handleBrandChange = (brand: string) => {
    let newSelectedBrands;
    
    if (brand === "all") {
      newSelectedBrands = ["all"];
    } else {
      // Remove "all" if it's in the selected brands
      const withoutAll = selectedBrands.filter(b => b !== "all");
      
      // Toggle the selected brand
      if (withoutAll.includes(brand)) {
        newSelectedBrands = withoutAll.filter(b => b !== brand);
      } else {
        newSelectedBrands = [...withoutAll, brand];
      }
      
      // If no brands are selected, select "all"
      if (newSelectedBrands.length === 0) {
        newSelectedBrands = ["all"];
      }
    }
    
    setSelectedBrands(newSelectedBrands);
    
    // Update filters with either "all" or the joined string of brands
    setFilters(prev => ({
      ...prev,
      brand: newSelectedBrands.includes("all") ? "all" : newSelectedBrands.join(",")
    }));
  };

  const handleLocationChange = (location: string) => {
    let newSelectedLocations;
    
    if (location === "all") {
      newSelectedLocations = ["all"];
    } else {
      // Remove "all" if it's in the selected locations
      const withoutAll = selectedLocations.filter(l => l !== "all");
      
      // Toggle the selected location
      if (withoutAll.includes(location)) {
        newSelectedLocations = withoutAll.filter(l => l !== location);
      } else {
        newSelectedLocations = [...withoutAll, location];
      }
      
      // If no locations are selected, select "all"
      if (newSelectedLocations.length === 0) {
        newSelectedLocations = ["all"];
      }
    }
    
    setSelectedLocations(newSelectedLocations);
    
    // Update filters with either "all" or the joined string of locations
    setFilters(prev => ({
      ...prev,
      location: newSelectedLocations.includes("all") ? "all" : newSelectedLocations.join(",")
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
    
    setSortOption("default");
    setSelectedBrands(["all"]);
    setSelectedLocations(["all"]);
    setSliderValue(initialPriceRange);
  };

  // Initialize selected brands and locations
  useEffect(() => {
    setSelectedBrands(["all"]);
    setSelectedLocations(["all"]);
  }, []);

  // Pass filter changes to parent component
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="lg:flex gap-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between bg-white rounded-lg shadow-md p-4"
        >
          <span className="text-lg font-semibold">Filters</span>
          <span>
            {showFilters ? (
              <i className="fas fa-chevron-up"></i>
            ) : (
              <i className="fas fa-chevron-down"></i>
            )}
          </span>
        </button>
      </div>
      
      {/* Filters Sidebar */}
      <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-64 flex-shrink-0`}>
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 lg:mb-0 lg:sticky lg:top-24">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Filters</h3>
            <button
              onClick={resetFilters}
              className="text-primary hover:text-primary-dark text-sm flex items-center"
            >
              <i className="fas fa-redo-alt mr-1"></i> Reset
            </button>
          </div>
          
          {/* Sort By */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Sort By</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sortBy"
                  value="default"
                  checked={sortOption === "default"}
                  onChange={handleSortChange}
                  className="text-primary focus:ring-primary mr-2"
                />
                <span className="text-sm">Recommended</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sortBy"
                  value="price_low_high"
                  checked={sortOption === "price_low_high"}
                  onChange={handleSortChange}
                  className="text-primary focus:ring-primary mr-2"
                />
                <span className="text-sm">Price: Low to High</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sortBy"
                  value="price_high_low"
                  checked={sortOption === "price_high_low"}
                  onChange={handleSortChange}
                  className="text-primary focus:ring-primary mr-2"
                />
                <span className="text-sm">Price: High to Low</span>
              </label>
            </div>
          </div>
          
          {/* Brands */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Brands</h4>
            <div className="max-h-40 overflow-y-auto pr-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes("all")}
                  onChange={() => handleBrandChange("all")}
                  className="text-primary focus:ring-primary mr-2"
                />
                <span className="text-sm">All Brands</span>
              </label>
              {brands.map((brand) => (
                <label key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.toLowerCase())}
                    onChange={() => handleBrandChange(brand.toLowerCase())}
                    className="text-primary focus:ring-primary mr-2"
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Locations */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Location</h4>
            <div className="max-h-40 overflow-y-auto pr-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedLocations.includes("all")}
                  onChange={() => handleLocationChange("all")}
                  className="text-primary focus:ring-primary mr-2"
                />
                <span className="text-sm">All Locations</span>
              </label>
              {locations.map((location) => (
                <label key={location} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(location.toLowerCase())}
                    onChange={() => handleLocationChange(location.toLowerCase())}
                    className="text-primary focus:ring-primary mr-2"
                  />
                  <span className="text-sm">{location}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Price Range */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Price Range</h4>
              <div className="text-xs text-gray-500">
                PKR {sliderValue[0].toLocaleString()} - {sliderValue[1].toLocaleString()}
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
            
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                <div className="px-3 py-2 border border-gray-300 rounded text-sm">
                  PKR {sliderValue[0].toLocaleString()}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                <div className="px-3 py-2 border border-gray-300 rounded text-sm">
                  PKR {sliderValue[1].toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content placeholder for the vehicle cards (will be rendered in the parent component) */}
      <div className="w-full"></div>
    </div>
  );
};

export default VehicleFilters;
