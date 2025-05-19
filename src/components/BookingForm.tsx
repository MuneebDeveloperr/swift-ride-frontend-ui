
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
    pickupDateTime: "",
    returnDateTime: "",
    vehicleCategory,
    rentalPlan: "12hour",
    withDriver: false,
    notes: "",
    vehicleId,
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [price, setPrice] = useState<number | null>(null);

  // Calculate estimated price when rental plan or driver option changes
  const updatePrice = () => {
    const calculatedPrice = calculatePrice(
      vehicleCategory,
      formData.rentalPlan,
      formData.withDriver
    );
    setPrice(calculatedPrice);
  };

  // Update price when relevant form fields change
  useEffect(() => {
    updatePrice();
  }, [formData.rentalPlan, formData.withDriver]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || 
        !formData.pickupLocation || !formData.dropLocation || 
        !formData.pickupDateTime || !formData.returnDateTime) {
      toast.error("Please fill in all required fields");
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
        pickupDateTime: "",
        returnDateTime: "",
        vehicleCategory,
        rentalPlan: "12hour",
        withDriver: false,
        notes: "",
        vehicleId,
      });
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    }, 1500);
  };

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
          
          {/* Location Information */}
          <div>
            <label className="form-label" htmlFor="pickupLocation">Pickup Location</label>
            <input
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              className="form-input"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="dropLocation">Drop-off Location</label>
            <input
              type="text"
              id="dropLocation"
              name="dropLocation"
              className="form-input"
              value={formData.dropLocation}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Date and Time */}
          <div>
            <label className="form-label" htmlFor="pickupDateTime">Pickup Date & Time</label>
            <input
              type="datetime-local"
              id="pickupDateTime"
              name="pickupDateTime"
              className="form-input"
              value={formData.pickupDateTime}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="returnDateTime">Return Date & Time</label>
            <input
              type="datetime-local"
              id="returnDateTime"
              name="returnDateTime"
              className="form-input"
              value={formData.returnDateTime}
              onChange={handleChange}
              required
            />
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
        
        {/* Price Display */}
        {price !== null && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <div className="flex justify-between items-center">
              <span className="font-medium">Estimated Price:</span>
              <span className="text-xl font-bold text-primary">
                PKR {price.toLocaleString()}
              </span>
            </div>
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
                <p className="text-xl font-bold text-primary">Total: PKR {price?.toLocaleString()}</p>
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
