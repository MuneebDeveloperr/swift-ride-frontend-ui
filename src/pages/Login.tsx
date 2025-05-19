
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "@/components/ui/sonner";
import { useUser } from "@/contexts/UserContext";
import Navbar from "@/components/Navbar";
import { v4 as uuidv4 } from "uuid";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be a backend authentication call
      if (email === "demo@example.com" && password === "password123") {
        const userData = {
          id: uuidv4(),
          name: "Demo User",
          email: "demo@example.com",
          dateOfBirth: "1990-01-01",
          gender: "male" as const,
          cnic: "12345-1234567-1",
          province: "Punjab",
          postalCode: "54000"
        };
        
        login(userData);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid email or password");
      }
      
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Login - Swift Ride</title>
        <meta name="description" content="Log in to your Swift Ride account to manage your bookings and profile." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20 pb-16 bg-gray-50 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-gray-600 mt-2">Log in to access your Swift Ride account</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                  
                  <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-dark">
                    Forgot password?
                  </Link>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <i className="fas fa-spinner fa-spin mr-2"></i> Logging in...
                    </span>
                  ) : 'Login'}
                </button>
                
                <div className="text-center mt-6">
                  <p className="text-gray-600 text-sm">
                    Don't have an account? <Link to="/signup" className="text-primary hover:text-primary-dark">Sign up</Link>
                  </p>
                </div>
                
                <div className="mt-6">
                  <p className="text-xs text-center text-gray-500 mb-2">Or login with demo account:</p>
                  <div className="bg-gray-100 p-3 rounded-md text-center">
                    <p className="text-sm text-gray-600">Email: demo@example.com</p>
                    <p className="text-sm text-gray-600">Password: password123</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
