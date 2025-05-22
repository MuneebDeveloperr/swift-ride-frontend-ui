
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white min-h-[80vh] flex items-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1597771113693-c7aa2b9cc7cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" 
        }}
      ></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 font-poppins">
            Premium Vehicle Rentals for Every Occasion
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Swift Ride offers premium car, bus, and coaster rentals for all your travel needs in Pakistan.
            Book online today for a seamless transportation experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/cars" 
              className="btn-primary px-6 py-3 text-lg"
            >
              Explore Vehicles
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
            <Link 
              to="/about" 
              className="btn-secondary px-6 py-3 text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
