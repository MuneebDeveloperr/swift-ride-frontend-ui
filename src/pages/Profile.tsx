
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { toast } from "@/components/ui/sonner";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { pakistanProvinces } from "@/data/mockData";

const Profile = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    cnic: "",
    province: "",
    postalCode: "",
    profileImage: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      // Populate form with user data
      setFormData({
        name: user.name || "",
        email: user.email || "",
        dateOfBirth: user.dateOfBirth || "",
        gender: user.gender || "",
        cnic: user.cnic || "",
        province: user.province || "",
        postalCode: user.postalCode || "",
        profileImage: user.profileImage || ""
      });
    }
  }, [user, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for CNIC to add dashes
    if (name === "cnic") {
      // Remove all dashes first
      let cleanValue = value.replace(/-/g, "");
      
      // Only allow numbers
      cleanValue = cleanValue.replace(/[^\d]/g, "");
      
      // Limit to 13 digits
      cleanValue = cleanValue.slice(0, 13);
      
      // Add dashes
      if (cleanValue.length > 5) {
        cleanValue = `${cleanValue.slice(0, 5)}-${cleanValue.slice(5)}`;
      }
      if (cleanValue.length > 13) {
        cleanValue = `${cleanValue.slice(0, 13)}-${cleanValue.slice(13)}`;
      }
      
      setFormData(prev => ({ ...prev, [name]: cleanValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error("Name and email are required");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      updateUser({
        name: formData.name,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as "male" | "female" | undefined,
        cnic: formData.cnic,
        province: formData.province,
        postalCode: formData.postalCode,
        profileImage: formData.profileImage
      });
      
      toast.success("Profile updated successfully");
      setIsSubmitting(false);
    }, 1500);
  };
  
  const handleRemoveProfilePicture = () => {
    setFormData(prev => ({ ...prev, profileImage: "" }));
    toast.success("Profile picture removed");
  };
  
  return (
    <>
      <Helmet>
        <title>Profile - Swift Ride</title>
        <meta name="description" content="Manage your Swift Ride profile and personal information." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20 pb-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <h1 className="text-2xl font-bold">Profile Settings</h1>
                <p className="text-gray-600 mt-2">Manage your personal information and account details</p>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Profile Image */}
                    <div className="md:col-span-1">
                      <div className="flex flex-col items-center">
                        <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 mb-4">
                          {formData.profileImage ? (
                            <img
                              src={formData.profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-5xl text-gray-400">
                              <i className="fas fa-user"></i>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2 w-full">
                          <button
                            type="button"
                            className="btn-outline w-full text-sm py-2"
                            onClick={() => toast.info("This feature would allow uploading a profile picture")}
                          >
                            <i className="fas fa-upload mr-2"></i> Upload Photo
                          </button>
                          
                          {formData.profileImage && (
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700 text-sm w-full py-2"
                              onClick={handleRemoveProfilePicture}
                            >
                              <i className="fas fa-trash-alt mr-2"></i> Remove Photo
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Profile Form */}
                    <div className="md:col-span-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="form-label" htmlFor="name">Full Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            value={formData.name}
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
                          <label className="form-label" htmlFor="dateOfBirth">Date of Birth</label>
                          <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            className="form-input"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div>
                          <label className="form-label">Gender</label>
                          <div className="flex space-x-4 mt-2">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === "male"}
                                onChange={handleChange}
                                className="mr-2"
                              />
                              Male
                            </label>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === "female"}
                                onChange={handleChange}
                                className="mr-2"
                              />
                              Female
                            </label>
                          </div>
                        </div>
                        
                        <div>
                          <label className="form-label" htmlFor="cnic">CNIC (with dashes)</label>
                          <input
                            type="text"
                            id="cnic"
                            name="cnic"
                            className="form-input"
                            placeholder="12345-1234567-1"
                            value={formData.cnic}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div>
                          <label className="form-label" htmlFor="province">Province</label>
                          <select
                            id="province"
                            name="province"
                            className="form-input"
                            value={formData.province}
                            onChange={handleChange}
                          >
                            <option value="">Select Province</option>
                            {pakistanProvinces.map((province) => (
                              <option key={province} value={province}>
                                {province}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="form-label" htmlFor="postalCode">Postal Code</label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            className="form-input"
                            value={formData.postalCode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <button
                          type="submit"
                          className="btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <i className="fas fa-spinner fa-spin mr-2"></i> Saving...
                            </span>
                          ) : 'Save Changes'}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
