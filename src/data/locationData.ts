
import { LocationData } from "@/types";

// Full location dataset with provinces and cities
export const locationData: LocationData = {
  "Punjab": [
    "Lahore", "Faisalabad", "Multan", "Gujranwala", "Sargodha", "Bahawalpur", 
    "Sialkot", "Dera Ghazi Khan", "Sheikhupura", "Kasur", "Okara", "Jhelum", 
    "Rajanpur", "Mandi Bahauddin", "Narowal", "Layyah", "Muzaffargarh", 
    "Lodhran", "Toba Tek Singh", "Khanewal", "Chakwal"
  ],
  "Sindh": [
    "Karachi", "Hyderabad", "Sukkur", "Larkana", "Mirpur Khas", 
    "Nawabshah (Shaheed Benazirabad)", "Dadu", "Jacobabad", "Shikarpur", 
    "Thatta", "Badin", "Jamshoro"
  ],
  "KPK": [
    "Peshawar", "Mardan", "Abbottabad", "Swat", "Kohat", "Dera Ismail Khan", 
    "Bannu", "Charsadda", "Mansehra", "Nowshera"
  ],
  "Balochistan": [
    "Quetta", "Khuzdar", "Gwadar", "Zhob", "Turbat", "Sibi", 
    "Loralai", "Chaman", "Nasirabad"
  ],
  "Islamabad Capital Territory": ["Islamabad"],
  "Gilgit-Baltistan": ["Gilgit", "Skardu", "Chilas", "Ghanche", "Astore"],
  "Azad Jammu & Kashmir": ["Muzaffarabad", "Mirpur", "Kotli", "Bhimber", "Rawalakot"]
};

// Subset of major cities for booking and pickup/dropoff locations
export const majorCities = [
  "Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Islamabad",
  "Gujranwala", "Peshawar", "Multan", "Sialkot", "Quetta",
  "Bahawalpur", "Sargodha", "Mardan", "Gujrat", "Sheikhupura"
];

// Time options for booking in 12-hour format with 1-hour intervals
export const timeOptions = [
  "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM",
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
];

// Add missing exports for provinces and cities that Profile.tsx is trying to import
export const provinces = Object.keys(locationData) as Array<keyof typeof locationData>;
export const cities = locationData;
