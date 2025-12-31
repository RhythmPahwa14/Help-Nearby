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
          const res = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`);
          setAddress(res.data.results[0]?.formatted || "Address not found.");
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
      setStatus('Request posted successfully!');
      setDescription("");
      setCategory("General");
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen pt-24 pb-8">
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
                            : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
                        }`}
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
                  <label className="block text-white font-semibold mb-4 text-lg">
                    📍 Your Location 
                  </label>
                  
                  {/* Location Help Guide */}
                  {!location && (
                    <div className="mb-4 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                      <h4 className="text-white font-semibold mb-2">🔧 Enable Location Detection:</h4>
                      <ul className="text-white/80 text-sm space-y-1 mb-3">
                        <li>• Click 🔒 (lock icon) in browser address bar</li>
                        <li>• Select "Allow" for Location permission</li>
                        <li>• Click button below to retry</li>
                        <li>• Or enter coordinates manually below ⬇️</li>
                      </ul>
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                      >
                        🌍 Try Location Again
                      </button>
                    </div>
                  )}
                  <div className="bg-white/10 border border-white/20 rounded-xl p-4">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <div className="text-white font-medium">{address || status}</div>
                        <div className="text-gray-400 text-sm mt-1">{status}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Manual Location Input (if auto-detect fails) */}
                {!location && (
                  <div>
                    <label className="block text-white font-semibold mb-4 text-lg">
                      📍 Enter Your Location Manually
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        placeholder="Latitude (e.g. 28.6139)"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        placeholder="Longitude (e.g. 77.2090)"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                          const lng = parseFloat(e.target.value);
                          if (!isNaN(lng)) {
                            setLocation(prev => ({ ...prev, lng }));
                            setAddress("Manual location set");
                          }
                        }}
                      />
                    </div>
                    <p className="text-white/70 text-sm mt-2">
                      💡 Tip: Use Google Maps to find your coordinates or enable location permission
                    </p>
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
