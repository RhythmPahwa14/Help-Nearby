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
            errorMessage = "🔒 Location blocked! Click the lock icon (🔒) in address bar → Allow Location → Refresh page OR enter coordinates manually below.";
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
            errorMessage = "🔒 Location blocked! Click the lock icon (🔒) in address bar → Allow Location → Refresh page OR enter coordinates manually below.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "📡 Location unavailable. Check your internet connection or enter location manually below.";
            break;
          case error.TIMEOUT:
            errorMessage = "⏰ Location timeout. Enter your coordinates manually below or try again.";
            break;
          default:
            errorMessage = "❌ Auto-location failed. Please enter your location manually below.";
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
      setStatus('✅ Help request posted successfully!');
      setDescription("");
      setCategory("General");
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) { 
      setStatus('❌ Failed to post request. Please try again.'); 
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
    <div className="min-h-screen relative overflow-hidden -mt-16 pt-16">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 min-h-screen pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              Request
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Help
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Let your community know how they can help you today
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-8 p-6 bg-green-500/20 border border-green-500/50 rounded-2xl backdrop-blur-md animate-pulse">
              <div className="flex items-center justify-center">
                <svg className="w-8 h-8 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-green-400 font-bold text-xl">Help Request Posted Successfully! 🎉</h3>
                  <p className="text-green-300 text-sm">Your request is now visible to nearby helpers</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-white font-semibold mb-4 text-lg">
                    Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setCategory(cat.value)}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          category === cat.value
                            ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-lg scale-105`
                            : 'bg-white/10 border-white/20 hover:bg-white/20'
                        }`}
                        style={category !== cat.value ? { color: '#000000' } : {}}
                      >
                        <div className="text-2xl mb-2">{cat.icon}</div>
                        <div className="text-sm font-semibold">{cat.value}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white font-semibold mb-3 text-lg">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Describe what kind of help you need in detail..."
                  />
                </div>

                {/* Location Display */}
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm">
                    📍 Your Location 
                  </label>
                  
                  {/* Location Help Guide */}
                  {!location && (
                    <div className="mb-3 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                      <h4 className="text-white font-semibold text-sm mb-1">🔧 Enable Location:</h4>
                      <p className="text-white/80 text-xs mb-2">Click 🔒 in address bar → Allow Location → Retry</p>
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs transition-colors"
                      >
                        🌍 Try Again
                      </button>
                    </div>
                  )}
                  <div className="bg-white/10 border border-white/20 rounded-lg p-3">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div className="text-white text-sm truncate">{address || status}</div>
                    </div>
                  </div>
                </div>

                {/* Manual Location Input (if auto-detect fails) */}
                {!location && (
                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm">
                      📍 Enter Manually
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        placeholder="Latitude"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                          const lat = parseFloat(e.target.value);
                          if (!isNaN(lat)) {
                            setLocation(prev => ({ ...prev, lat }));
                            setAddress("Manual location set");
                          }
                        }}
                      />
                      <input
                        type="number"
                        placeholder="Longitude"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                          const lng = parseFloat(e.target.value);
                          if (!isNaN(lng)) {
                            setLocation(prev => ({ ...prev, lng }));
                            setAddress("Manual location set");
                          }
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || (!location && !address)}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Submitting Request...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Submit Help Request
                    </div>
                  )}
                </button>
              </form>
            </div>

            {/* Map Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Location Preview</h3>
              {location ? (
                <div className="h-80 rounded-2xl overflow-hidden">
                  <MapContainer 
                    center={[location.lat, location.lng]} 
                    zoom={15} 
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[location.lat, location.lng]}>
                      <Popup>Your detected location</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              ) : (
                <div className="h-80 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/80">Detecting your location...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpRequest;
