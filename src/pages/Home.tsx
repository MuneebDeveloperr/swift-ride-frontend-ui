
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import VehicleCategories from "@/components/VehicleCategories";
import FeatureSection from "@/components/FeatureSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Swift Ride - Online Vehicle Reservation System</title>
        <meta name="description" content="Book cars, buses, minibuses & coasters online. Swift Ride offers the best vehicle rental services in Pakistan." />
      </Helmet>

      <Navbar />
      
      <main className="pt-16">
        <Hero />
        
        <VehicleCategories />
        
        {/* Replaced Booking Section with Informative Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Book Your Vehicle Now</h2>
                <p className="text-gray-600 mb-8">
                  At Swift Ride, we make vehicle rental easy and affordable for everyone. With a wide selection of cars, buses, mini buses, and coasters, you're sure to find the perfect vehicle for your needs.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Easy Booking Process</h3>
                      <p className="text-gray-600">Simple and straightforward booking with minimal hassle. Choose your vehicle, pick your dates, and you're ready to go.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Flexible Rental Plans</h3>
                      <p className="text-gray-600">Choose from 12-hour, 2-day, or 3-day rental options to fit your specific travel needs and budget.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                      <i className="fas fa-car"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Wide Range of Vehicles</h3>
                      <p className="text-gray-600">From economical cars to spacious buses, our diverse fleet ensures you'll find the perfect vehicle for any occasion.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Safe & Reliable Service</h3>
                      <p className="text-gray-600">All our vehicles are regularly maintained and thoroughly cleaned between rentals for your safety and comfort.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link to="/cars" className="btn-primary">Explore Vehicles</Link>
                </div>
              </div>
              
              <div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">How It Works</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">1</div>
                      <div>
                        <h4 className="font-medium mb-1">Choose Your Vehicle</h4>
                        <p className="text-gray-600">Browse our extensive fleet and select the vehicle that meets your needs.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">2</div>
                      <div>
                        <h4 className="font-medium mb-1">Select Rental Details</h4>
                        <p className="text-gray-600">Pick your rental duration, driver option, and specify your locations.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">3</div>
                      <div>
                        <h4 className="font-medium mb-1">Complete Booking</h4>
                        <p className="text-gray-600">Fill in your details, confirm your booking, and make a secure payment.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">4</div>
                      <div>
                        <h4 className="font-medium mb-1">Enjoy Your Ride</h4>
                        <p className="text-gray-600">Pick up your vehicle at the scheduled time and enjoy your journey!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <FeatureSection />
        
        <TestimonialsSection />
        
        <CTASection />
      </main>
      
      <Footer />
    </>
  );
};

export default Home;
