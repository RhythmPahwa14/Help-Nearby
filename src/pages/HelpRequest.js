import React, { useState, useEffect } from "react";
import axios from "axios";
import { requestsAPI } from "../services/api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix for default Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function HelpRequest() {
  // const { user } = useAuth(); // Commented out as not used currently

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState('Detecting your location...');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const locationOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 300000,
    };

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by this browser.');
      return;
    }

    setStatus('Requesting location permission...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setStatus('Location detected successfully!');
        try {
          // Using FREE Nominatim API (OpenStreetMap) - no API key required
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&zoom=18`,
            { headers: { 'User-Agent': 'HelpNearbyApp/1.0' } }
          );
          
          // Build detailed address from address components
          const addr = res.data.address || {};
          const parts = [];
          
          // Add most specific location details first
          if (addr.house_number) parts.push(`House No. ${addr.house_number}`);
          if (addr.building || addr.amenity) parts.push(addr.building || addr.amenity);
          if (addr.road || addr.street) parts.push(addr.road || addr.street);
          if (addr.neighbourhood) parts.push(addr.neighbourhood);
          if (addr.suburb && addr.suburb !== addr.neighbourhood) parts.push(addr.suburb);
          
          // Add city/town (pick one to avoid duplicates)
          const cityName = addr.city || addr.town || addr.village || addr.state_district;
          if (cityName) parts.push(cityName);
          
          if (addr.state) parts.push(addr.state);
          if (addr.postcode) parts.push(addr.postcode);
          
          // Remove any duplicates
          const uniqueParts = [...new Set(parts)];
          const fullAddress = uniqueParts.length > 0 ? uniqueParts.join(', ') : res.data.display_name;
          setAddress(fullAddress || "Address not found.");
        } catch (error) { 
          setAddress("Could not fetch address."); 
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = '';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location blocked! Click the lock icon in address bar → Allow Location → Refresh page OR enter coordinates manually below.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable. Please try again.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
          default:
            errorMessage = "Unable to get location. Please enter address manually.";
            break;
        }
        setStatus(errorMessage);
        // Set a default location (Delhi) as fallback
        setLocation({ lat: 28.6139, lng: 77.2090 });
        setAddress("Please enter your address manually");
      },
      locationOptions
    );
  }, []);

  const getCurrentLocation = () => {
    const locationOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 300000,
    };

    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by this browser.');
      return;
    }

    setStatus('Requesting location permission...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setStatus('Location detected successfully!');
        try {
          // Using free Nominatim API instead of OpenCage
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=16&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'Help-Nearby-App'
              }
            }
          );
          if (response.data && response.data.display_name) {
            setAddress(response.data.display_name);
          } else {
            setAddress(`Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }
        } catch (error) {
          console.error("Address lookup error:", error);
          setAddress(`Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = '';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location blocked! Click the lock icon in address bar → Allow Location → Refresh page OR enter coordinates manually below.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location unavailable. Check your internet connection or enter location manually below.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location timeout. Enter your coordinates manually below or try again.";
            break;
          default:
            errorMessage = "Auto-location failed. Please enter your location manually below.";
            break;
        }
        setStatus(errorMessage);
      },
      locationOptions
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('Submitting your request...');
    try {
      await requestsAPI.createRequest({
        description,
        category,
        location,
        address
      });
      setShowSuccess(true);
      setStatus('Help request posted successfully!');
      setDescription("");
      setCategory("General");
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) { 
      setStatus('Failed to post request. Please try again.'); 
    }
    setIsLoading(false);
  };

  const categories = [
    { value: "General", icon: "🔧", color: "from-blue-500 to-purple-500" },
    { value: "Groceries", icon: "🛒", color: "from-green-500 to-emerald-500" },
    { value: "Medical", icon: "🏥", color: "from-red-500 to-pink-500" },
    { value: "Transport", icon: "🚗", color: "from-yellow-500 to-orange-500" },
    { value: "Household", icon: "🏠", color: "from-purple-500 to-indigo-500" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-8">
          <div className="relative">
            <img
              src="/requests.jpeg"
              alt="Post a Help Request"
              className="w-full h-44 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60"></div>
            <div className="absolute left-6 bottom-6">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Post a Help Request</h1>
              <p className="text-sm text-slate-600">Let your local community know how they can support you today. It only takes a minute.</p>
            </div>
          </div>
        </div>

        {/* Main content: form + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left / Main Form (2 cols on large) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow p-6">
              {/* Category pills */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">What do you need help with?</h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setCategory(cat.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-shadow border ${category === cat.value ? 'bg-emerald-100 text-emerald-800 border-emerald-200 shadow' : 'bg-slate-100 text-slate-700 border-slate-200 hover:shadow-sm'}`}
                    >
                      <span className="mr-2">{cat.icon}</span>
                      {cat.value}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="my-4" />

              <h3 className="text-lg font-semibold text-slate-800 mb-4">Request Details</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={description.split('\n')[0] || ''}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Need help moving a heavy sofa"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    placeholder="Describe what you need help with. Include details like time, items needed, or specific instructions..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-200 resize-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 mt-4">
                  <button
                    type="submit"
                    disabled={isLoading || (!location && !address)}
                    className="inline-flex items-center gap-3 bg-emerald-300 text-emerald-900 px-6 py-3 rounded-full font-semibold hover:brightness-95 disabled:opacity-60"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    {isLoading ? 'Posting...' : 'Post Request'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setDescription(''); setCategory('General'); }}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full border border-slate-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow p-4">
              <h4 className="text-sm font-semibold text-slate-800 mb-3">Location Preview</h4>
              <div className="rounded-xl overflow-hidden mb-3 border border-slate-100">
                {location ? (
                  <div style={{ height: 160 }}>
                    <MapContainer center={[location.lat, location.lng]} zoom={14} style={{ height: '100%', width: '100%' }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker position={[location.lat, location.lng]} />
                    </MapContainer>
                  </div>
                ) : (
                  <div className="h-40 bg-slate-50 flex items-center justify-center text-slate-500">No location yet</div>
                )}
              </div>
              <div className="text-sm text-slate-600">
                <div className="font-medium text-slate-800">Current Location</div>
                <div className="text-xs text-slate-500 truncate">{address || status}</div>
                <button onClick={getCurrentLocation} className="mt-2 text-emerald-600 text-sm font-medium">Change Location</button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-4">
              <h4 className="text-sm font-semibold text-slate-800 mb-3">Tips for safety</h4>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                <li>Keep personal sensitive information private in the description.</li>
                <li>Coordinate help in public spaces when possible.</li>
                <li>Check the profiles of people offering help.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpRequest;
