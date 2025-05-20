
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";
import { BookingFormData, RentalPlan } from "@/types";
import { calculatePrice } from "@/utils/pricing";
import { majorCities, timeOptions } from "@/data/locationData";

interface BookingFormProps {
  vehicleCategory: "car" | "bus" | "minibus" | "coaster";
  vehicleId?: string;
  onSuccess?: () => void;
}

const BookingForm = ({ vehicleCategory, vehicleId, onSuccess }: BookingFormProps) => {
  const { user } = useUser();
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    pickupLocation: "",
    dropLocation: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    vehicleCategory,
    rentalPlan: "12hour",
    withDriver: false,
    notes: "",
    vehicleId,
  });

  // Shared Ride State
  const [enableSharedRide, setEnableSharedRide] = useState(false);
  const [sharedRiderInfo, setSharedRiderInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [price, setPrice] = useState<number | null>(null);
  const [pricePerRider, setPricePerRider] = useState<number | null>(null);

  // Calculate estimated price when rental plan or driver option changes
  const updatePrice = () => {
    const calculatedPrice = calculatePrice(
      vehicleCategory,
      formData.rentalPlan,
      formData.withDriver
    );
    setPrice(calculatedPrice);
    
    // Calculate price per rider if shared ride is enabled
    if (enableSharedRide) {
      setPricePerRider(calculatedPrice / 2);
    } else {
      setPricePerRider(null);
    }
  };

  // Update price when relevant form fields change
  useEffect(() => {
    updatePrice();
  }, [formData.rentalPlan, formData.withDriver, enableSharedRide]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Update price when rental plan changes
    if (name === "rentalPlan") {
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value as RentalPlan
      }));
    }
  };

  const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const withDriver = e.target.value === "with";
    setFormData((prev) => ({ ...prev, withDriver }));
  };

  const handleSharedRiderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSharedRiderInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSharedRideToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnableSharedRide(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || 
        !formData.pickupLocation || !formData.dropLocation || 
        !formData.pickupDate || !formData.returnDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate shared rider info if shared ride is enabled
    if (enableSharedRide && (!sharedRiderInfo.name || !sharedRiderInfo.phone)) {
      toast.error("Please fill in all shared rider information");
      return;
    }
    
    // Show confirmation dialog
    updatePrice();
    setShowConfirmation(true);
  };

  const confirmBooking = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(false);
      
      // Success message
      toast.success("Your booking has been submitted successfully!");
      
      // Reset form
      setFormData({
        fullName: user?.name || "",
        email: user?.email || "",
        phone: "",
        pickupLocation: "",
        dropLocation: "",
        pickupDate: "",
        pickupTime: "",
        returnDate: "",
        returnTime: "",
        vehicleCategory,
        rentalPlan: "12hour",
        withDriver: false,
        notes: "",
        vehicleId,
      });
      setEnableSharedRide(false);
      setSharedRiderInfo({
        name: "",
        phone: "",
        email: "",
      });
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    }, 1500);
  };

  // Check if vehicle category supports shared rides
  const isSharedRideSupported = ["car", "minibus", "coaster"].includes(vehicleCategory);

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Book Your Vehicle</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Information */}
          <div>
            <label className="form-label" htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-input"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-input"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Location Information - Updated to use dropdowns with city list */}
          <div>
            <label className="form-label" htmlFor="pickupLocation">Pickup Location</label>
            <select
              id="pickupLocation"
              name="pickupLocation"
              className="form-input"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
            >
              <option value="">Select Pickup Location</option>
              {majorCities.map((city) => (
                <option key={`pickup-${city}`} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="form-label" htmlFor="dropLocation">Drop-off Location</label>
            <select
              id="dropLocation"
              name="dropLocation"
              className="form-input"
              value={formData.dropLocation}
              onChange={handleChange}
              required
            >
              <option value="">Select Drop-off Location</option>
              {majorCities.map((city) => (
                <option key={`dropoff-${city}`} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          {/* Date and Time - Updated time with dropdown */}
          <div>
            <label className="form-label" htmlFor="pickupDate">Pickup Date</label>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              className="form-input"
              value={formData.pickupDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="pickupTime">Pickup Time</label>
            <select
              id="pickupTime"
              name="pickupTime"
              className="form-input"
              value={formData.pickupTime}
              onChange={handleChange}
              required
            >
              <option value="">Select Pickup Time</option>
              {timeOptions.map((time) => (
                <option key={`pickup-${time}`} value={time}>{time}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="form-label" htmlFor="returnDate">Return Date</label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              className="form-input"
              value={formData.returnDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="returnTime">Return Time</label>
            <select
              id="returnTime"
              name="returnTime"
              className="form-input"
              value={formData.returnTime}
              onChange={handleChange}
              required
            >
              <option value="">Select Return Time</option>
              {timeOptions.map((time) => (
                <option key={`return-${time}`} value={time}>{time}</option>
              ))}
            </select>
          </div>
          
          {/* Rental Options */}
          <div>
            <label className="form-label" htmlFor="rentalPlan">Rental Plan</label>
            <select
              id="rentalPlan"
              name="rentalPlan"
              className="form-input"
              value={formData.rentalPlan}
              onChange={handleChange}
              required
            >
              <option value="12hour">12 Hour</option>
              <option value="2day">2 Day</option>
              <option value="3day">3 Day</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">Driver Option</label>
            <div className="flex mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="driverOption"
                  value="with"
                  checked={formData.withDriver}
                  onChange={handleDriverChange}
                  className="mr-2"
                />
                With Driver
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="driverOption"
                  value="without"
                  checked={!formData.withDriver}
                  onChange={handleDriverChange}
                  className="mr-2"
                />
                Without Driver
              </label>
            </div>
          </div>
        </div>
        
        {/* Shared Ride Option */}
        {isSharedRideSupported && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-blue-800">Shared Ride Option</h4>
                <p className="text-sm text-blue-600">Split the cost with a friend</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={enableSharedRide}
                  onChange={handleSharedRideToggle}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            {enableSharedRide && (
              <div className="space-y-4 mt-4 border-t border-blue-200 pt-4">
                <p className="text-sm text-blue-700 mb-3">
                  You and your friend will both receive booking confirmation and split payment.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label text-sm" htmlFor="sharedRiderName">Friend's Name</label>
                    <input
                      type="text"
                      id="sharedRiderName"
                      name="name"
                      className="form-input"
                      value={sharedRiderInfo.name}
                      onChange={handleSharedRiderChange}
                      required={enableSharedRide}
                    />
                  </div>
                  <div>
                    <label className="form-label text-sm" htmlFor="sharedRiderPhone">Friend's Phone</label>
                    <input
                      type="tel"
                      id="sharedRiderPhone"
                      name="phone"
                      className="form-input"
                      value={sharedRiderInfo.phone}
                      onChange={handleSharedRiderChange}
                      required={enableSharedRide}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="form-label text-sm" htmlFor="sharedRiderEmail">Friend's Email (Optional)</label>
                    <input
                      type="email"
                      id="sharedRiderEmail"
                      name="email"
                      className="form-input"
                      value={sharedRiderInfo.email}
                      onChange={handleSharedRiderChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Price Display */}
        {price !== null && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <div className="flex justify-between items-center">
              <span className="font-medium">Estimated Price:</span>
              <span className="text-xl font-bold text-primary">
                PKR {enableSharedRide ? `${pricePerRider?.toLocaleString()} per person` : price.toLocaleString()}
              </span>
            </div>
            
            {enableSharedRide && pricePerRider !== null && (
              <div className="border-t border-gray-300 mt-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span>Total booking price:</span>
                  <span className="font-medium">PKR {price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Split equally (50% each):</span>
                  <span className="font-medium">PKR {pricePerRider.toLocaleString()} × 2 people</span>
                </div>
              </div>
            )}
            
            <div className="text-xs text-gray-500 mt-1">
              Price for {formData.rentalPlan === "12hour" ? "12 Hours" : 
                         formData.rentalPlan === "2day" ? "2 Days" : "3 Days"} 
              {formData.withDriver ? " with driver" : " without driver"}
            </div>
          </div>
        )}
        
        {/* Notes */}
        <div className="mt-4">
          <label className="form-label" htmlFor="notes">Additional Notes (optional)</label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="form-input"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        
        {/* Submit Button */}
        <div className="mt-6">
          <button type="submit" className="btn-primary w-full">
            Book Now
          </button>
        </div>
      </form>

      {/* Confirmation Modal - Using AlertDialog for better UX */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Booking</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-3 mb-4">
                <p><span className="font-medium">Vehicle:</span> {vehicleCategory.charAt(0).toUpperCase() + vehicleCategory.slice(1)}</p>
                <p><span className="font-medium">Rental Plan:</span> {formData.rentalPlan === "12hour" ? "12 Hours" : 
                        formData.rentalPlan === "2day" ? "2 Days" : "3 Days"}</p>
                <p><span className="font-medium">Driver:</span> {formData.withDriver ? "With Driver" : "Without Driver"}</p>
                <p><span className="font-medium">Pickup:</span> {formData.pickupLocation}</p>
                <p><span className="font-medium">Drop-off:</span> {formData.dropLocation}</p>
                
                {enableSharedRide && (
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-200 mt-2">
                    <p className="font-medium text-blue-800 mb-1">Shared Ride</p>
                    <p><span className="font-medium">Co-passenger:</span> {sharedRiderInfo.name}</p>
                    <p><span className="font-medium">Your price:</span> PKR {pricePerRider?.toLocaleString()}</p>
                    <p className="text-xs text-blue-600 mt-1">Both passengers will receive booking confirmation.</p>
                  </div>
                )}
                
                <p className="text-xl font-bold text-primary mt-4">
                  {enableSharedRide 
                    ? `Your Share: PKR ${pricePerRider?.toLocaleString()}` 
                    : `Total: PKR ${price?.toLocaleString()}`
                  }
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmBooking}
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? 
                <span className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i> Processing...
                </span> : 
                'Confirm Booking'
              }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookingForm;
