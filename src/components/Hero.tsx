
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2940&auto=format&fit=crop')",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-32 md:py-40 relative">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Premium Vehicle Rentals for Every Occasion
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Swift Ride offers a wide range of quality vehicles for rent,
            from luxury cars to spacious buses. Experience comfort and reliability
            on your journey.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/cars" className="btn-primary text-lg">
              Book Now
            </Link>
            <Link to="/buses" className="btn-outline text-lg">
              View All Vehicles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
