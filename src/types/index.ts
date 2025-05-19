
// Extend the existing types file to include profile and role properties
// Note: This assumes there's already a User type defined in this file
// We're adding to it rather than redefining it completely

// If the User type already exists in this file, we're extending it
// If not, we're creating it

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  profile?: UserProfile;
}

export interface UserProfile {
  name: string;
  email: string;
  dob?: string;
  gender?: string;
  cnic?: string;
  province?: string;
  city?: string;
  postalCode?: string;
}
