
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Password reset instructions sent to your email");
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password - Swift Ride</title>
        <meta name="description" content="Reset your Swift Ride account password." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20 pb-16 bg-gray-50 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              {!submitted ? (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold">Forgot Password</h1>
                    <p className="text-gray-600 mt-2">Enter your email to reset your password</p>
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
                    
                    <button
                      type="submit"
                      className="btn-primary w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <i className="fas fa-spinner fa-spin mr-2"></i> Sending...
                        </span>
                      ) : 'Reset Password'}
                    </button>
                    
                    <div className="text-center mt-6">
                      <p className="text-gray-600 text-sm">
                        Remember your password? <Link to="/login" className="text-primary hover:text-primary-dark">Back to login</Link>
                      </p>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="text-6xl text-green-500 mb-4">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
                  <p className="text-gray-600 mb-6">
                    We've sent password reset instructions to:
                    <br />
                    <span className="font-medium">{email}</span>
                  </p>
                  <p className="text-gray-600 mb-8 text-sm">
                    If you don't see the email, please check your spam folder.
                  </p>
                  <div className="space-y-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-outline w-full"
                    >
                      Try Another Email
                    </button>
                    <Link to="/login" className="btn-primary w-full block text-center">
                      Back to Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
