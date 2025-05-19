
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "@/components/ui/sonner";
import { useUser } from "@/contexts/UserContext";
import Navbar from "@/components/Navbar";
import { v4 as uuidv4 } from "uuid";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (!formData.agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: uuidv4(),
        name: formData.name,
        email: formData.email,
        dateOfBirth: "",
        gender: "male" as const,
        cnic: "",
        province: "",
        postalCode: ""
      };
      
      login(userData);
      toast.success("Account created successfully!");
      navigate("/");
      
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Swift Ride</title>
        <meta name="description" content="Create your Swift Ride account to book vehicles and manage your rentals." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20 pb-16 bg-gray-50 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Create an Account</h1>
                <p className="text-gray-600 mt-2">Join Swift Ride for a better rental experience</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="form-label" htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-input"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-input"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      required
                    />
                    <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-600">
                      I agree to the <a href="#" className="text-primary hover:text-primary-dark">Terms of Service</a> and <a href="#" className="text-primary hover:text-primary-dark">Privacy Policy</a>
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <i className="fas fa-spinner fa-spin mr-2"></i> Creating Account...
                    </span>
                  ) : 'Sign Up'}
                </button>
                
                <div className="text-center mt-6">
                  <p className="text-gray-600 text-sm">
                    Already have an account? <Link to="/login" className="text-primary hover:text-primary-dark">Log in</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
