
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import Navbar from "@/components/Navbar";

const Settings = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    
    if (formData.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Password updated successfully");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <>
      <Helmet>
        <title>Settings - Swift Ride</title>
        <meta name="description" content="Manage your Swift Ride account settings." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20 pb-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
              </div>
              
              <div className="p-6">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-6">Change Password</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label className="form-label" htmlFor="currentPassword">Current Password</label>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          className="form-input"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="form-label" htmlFor="newPassword">New Password</label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          className="form-input"
                          value={formData.newPassword}
                          onChange={handleChange}
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Password must be at least 8 characters long
                        </p>
                      </div>
                      
                      <div>
                        <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className="form-input"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <button
                          type="submit"
                          className="btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <i className="fas fa-spinner fa-spin mr-2"></i> Updating...
                            </span>
                          ) : 'Update Password'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                
                <div className="border-t border-gray-200 pt-8">
                  <h2 className="text-xl font-semibold mb-6">Account Security</h2>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <button
                        className="btn-outline text-sm py-1 px-3"
                        onClick={() => toast.info("This feature would enable two-factor authentication")}
                      >
                        Enable
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Login Sessions</h3>
                        <p className="text-sm text-gray-600">
                          Manage your active login sessions
                        </p>
                      </div>
                      <button
                        className="btn-outline text-sm py-1 px-3"
                        onClick={() => toast.info("This feature would show your active login sessions")}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-8 mt-8">
                  <h2 className="text-xl font-semibold mb-6">Danger Zone</h2>
                  
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h3 className="font-medium text-red-600">Delete Account</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition duration-300 text-sm"
                      onClick={() => toast.error("This action would delete your account")}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Settings;
