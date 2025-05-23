
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import VehicleFilters from "@/components/VehicleFilters";
import { busesData } from "@/data/mockData";
import { VehicleType } from "@/types";

const Buses = () => {
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleType[]>(busesData);
  const [loading, setLoading] = useState(true);
  
  // Extract unique brands and locations
  const brands = [...new Set(busesData.map(bus => bus.brand))];
  const locations = [...new Set(busesData.map(bus => bus.location))];
  
  // Apply filters
  const handleFilterChange = (filters: any) => {
    let filtered = [...busesData];
    
    // Apply brand filter
    if (filters.brand !== "all") {
      const selectedBrands = filters.brand.split(",");
      filtered = filtered.filter(bus => 
        selectedBrands.includes(bus.brand.toLowerCase())
      );
    }
    
    // Apply location filter
    if (filters.location !== "all") {
      const selectedLocations = filters.location.split(",");
      filtered = filtered.filter(bus => 
        selectedLocations.includes(bus.location.toLowerCase())
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(bus => 
      bus.pricePerDay >= filters.priceRange[0] && 
      bus.pricePerDay <= filters.priceRange[1]
    );
    
    // Apply sorting
    if (filters.sortBy === "price_low_high") {
      filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (filters.sortBy === "price_high_low") {
      filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }
    
    setFilteredVehicles(filtered);
  };
  
  // Simulate loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Buses for Rent - Swift Ride</title>
        <meta name="description" content="Browse and book our selection of quality buses for rent. Perfect for large groups, events, or corporate transportation." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20 pb-16 bg-gray-50 min-h-screen w-full">
        <div className="content-container mx-auto animate-fade-in">
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-2">Buses for Rent</h1>
            <p className="text-gray-600 mb-6">
              Our buses are perfect for large groups, events, or corporate transportation.
              Choose from top brands like Yutong, Hino, Isuzu, and MAN for a comfortable journey.
            </p>
            
            <div className="lg:flex gap-6">
              {/* Filters */}
              <VehicleFilters 
                vehicleType="bus"
                brands={brands}
                locations={locations}
                onFilterChange={handleFilterChange}
              />
              
              {/* Results */}
              <div className="w-full">
                {loading ? (
                  <div className="py-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    <p className="mt-4 text-gray-600">Loading buses...</p>
                  </div>
                ) : filteredVehicles.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="text-3xl text-gray-400 mb-4">
                      <i className="fas fa-search"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No buses found</h3>
                    <p className="text-gray-600">
                      Try adjusting your filters to find available buses.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredVehicles.map((bus) => (
                      <VehicleCard key={bus.id} vehicle={bus} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Buses;
