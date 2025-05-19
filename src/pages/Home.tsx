
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import VehicleCategories from "@/components/VehicleCategories";
import FeatureSection from "@/components/FeatureSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import BookingForm from "@/components/BookingForm";

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
        
        {/* Booking Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Book Your Vehicle Now</h2>
                <p className="text-gray-600 mb-8">
                  Looking for a convenient transportation solution? Fill out the form to book your vehicle today. 
                  We offer competitive rates and a wide range of vehicles to choose from.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Easy Booking Process</h3>
                      <p className="text-gray-600">Simple and straightforward booking with minimal hassle.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Flexible Rental Plans</h3>
                      <p className="text-gray-600">Choose from 12-hour, 2-day, or 3-day rental options.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                      <i className="fas fa-car"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Wide Range of Vehicles</h3>
                      <p className="text-gray-600">Cars, buses, mini buses, and coasters to suit your needs.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <BookingForm vehicleCategory="car" />
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
