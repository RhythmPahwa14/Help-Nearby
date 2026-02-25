import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { requestsAPI } from "../services/api";
import L from "leaflet";

// Fix for default Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Component to update map center when it changes
function ChangeMapView({ userLocation, allMarkers }) {
  const map = useMap();
  const [hasCentered, setHasCentered] = React.useState(false);
  
  useEffect(() => {
    if (!hasCentered && allMarkers && allMarkers.length > 0) {
      map.invalidateSize();
      
      // If we have markers, fit bounds to show all of them
      if (allMarkers.length > 0) {
        const bounds = L.latLngBounds(allMarkers);
        
        // Add padding to the bounds
        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 15,
          animate: true
        });
        
        setTimeout(() => {
          setHasCentered(true);
        }, 1000);
      }
    }
  }, [allMarkers, map, hasCentered]);
  
  return null;
}

function MapView() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [mapCenter, setMapCenter] = useState([30.7333, 76.7794]);
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState('');
  const navigate = useNavigate();

  // Extract lat/lng from various location formats
  const extractLatLng = (req) => {
    // Check for GeoJSON format: location.coordinates = [lng, lat]
    if (req?.location?.coordinates && req.location.coordinates.length >= 2) {
      return [req.location.coordinates[1], req.location.coordinates[0]];
    }
    // Check for lat/lng format stored directly
    if (req?.location?.lat && req?.location?.lng) {
      return [req.location.lat, req.location.lng];
    }
    return null;
  };

  useEffect(() => {
    // Get user's location first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          setMapCenter([latitude, longitude]);
          setUserLocation([latitude, longitude]);
          
          // Fetch address using free Nominatim API
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&zoom=18`,
              { headers: { 'User-Agent': 'HelpNearbyApp/1.0' } }
            );
            const data = await res.json();
            
            // Build detailed address from address components
            const addr = data.address || {};
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
            const fullAddress = uniqueParts.length > 0 ? uniqueParts.join(', ') : data.display_name;
            setUserAddress(fullAddress || 'Your location');
          } catch (err) {
            setUserAddress('Your location');
          }
        },
        (err) => {
          console.log("Geolocation not available:", err);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }

    // Fetch requests
    const fetchRequests = async () => {
      try {
        const allRequests = await requestsAPI.getRequests();
        console.log('Total requests fetched:', allRequests.length);
        // Show all requests, not filtering by status
        setRequests(allRequests);
      } catch (error) {
        console.error("Error fetching requests for map:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const categories = ['all', 'General', 'Groceries', 'Medical', 'Transport', 'Household'];
  const filteredRequests = filter === 'all' ? requests : requests.filter(req => req.category === filter);

  const getCategoryIcon = (category) => {
    const icons = {
      General: "🔧",
      Groceries: "🛒",
      Medical: "🏥",
      Transport: "🚗",
      Household: "🏠"
    };
    return icons[category] || "📝";
  };

  const getCategoryColor = (category) => {
    const colors = {
      General: "#3b82f6",
      Groceries: "#4a7c59",
      Medical: "#ef4444",
      Transport: "#f59e0b",
      Household: "#8b5cf6"
    };
    return colors[category] || "#6b7280";
  };

  // Helper: calculate distance in miles between two [lat, lng] points
  const getDistance = (loc1, loc2) => {
    if (!loc1 || !loc2) return null;
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 3958.8; // Earth radius in miles
    const dLat = toRad(loc2[0] - loc1[0]);
    const dLon = toRad(loc2[1] - loc1[1]);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(loc1[0])) * Math.cos(toRad(loc2[0])) * Math.sin(dLon / 2) ** 2;
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
  };

  // Helper: time ago string
  const timeAgo = (dateStr) => {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Search-filtered requests
  const searchFilteredRequests = filteredRequests.filter((req) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (req.description && req.description.toLowerCase().includes(q)) ||
      (req.category && req.category.toLowerCase().includes(q)) ||
      (req.location?.address && req.location.address.toLowerCase().includes(q)) ||
      (req.address && req.address.toLowerCase().includes(q))
    );
  });

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-gray-200 border-t-[#4a7c59] rounded-full animate-spin mx-auto mb-5"></div>
          <p className="text-gray-600 text-lg font-medium">Loading Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen relative flex">
      {/* Sidebar Toggle for mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-20 left-4 z-[1100] md:hidden bg-white shadow-lg rounded-xl p-2.5 border border-gray-200"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {sidebarOpen
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          }
        </svg>
      </button>

      {/* Sidebar Panel */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 absolute md:relative z-[1050] md:z-auto top-16 md:top-0 left-0 h-[calc(100vh-4rem)] md:h-screen w-[340px] md:w-[360px] bg-gray-50 border-r border-gray-200 flex flex-col shadow-xl md:shadow-none`}>
        <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4 space-y-6">

          {/* Search Bar */}
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search address, shelter, or food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 focus:border-[#4a7c59] transition-all"
            />
            <button
              onClick={() => {
                if (userLocation) {
                  setMapCenter(userLocation);
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
              title="Go to my location"
            >
              <svg className="w-4 h-4 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4m0 12v4m10-10h-4M6 12H2" />
              </svg>
            </button>
          </div>

          {/* Filter Assistance */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Filter Assistance</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {categories.filter(c => c !== 'all').map((category) => {
                const isActive = filter === category;
                const iconMap = {
                  Groceries: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 006.55 17h11.9M7 13L5.4 5M17 17a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                  ),
                  Medical: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84 50.452 50.452 0 00-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                    </svg>
                  ),
                  Household: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
                    </svg>
                  ),
                  Transport: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8m-8 4h8m-6 4h4M5 3h14a2 2 0 012 2v14a2 2 0 01-1.105 1.789l-6 3a2 2 0 01-1.79 0l-6-3A2 2 0 013 19V5a2 2 0 012-2z" />
                    </svg>
                  ),
                  General: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                };
                return (
                  <button
                    key={category}
                    onClick={() => setFilter(filter === category ? 'all' : category)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                      isActive
                        ? 'bg-[#4a7c59] text-white border-[#4a7c59] shadow-md'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#4a7c59]/40 hover:bg-[#4a7c59]/5'
                    }`}
                  >
                    {iconMap[category] || null}
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Active Requests */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-gray-800">
                Active Requests ({searchFilteredRequests.length})
              </h3>
              <button onClick={() => navigate('/requests')} className="text-sm font-semibold text-[#4a7c59] hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
              {searchFilteredRequests.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No requests found</p>
              ) : (
                searchFilteredRequests.slice(0, 10).map((req) => {
                  const latlng = extractLatLng(req);
                  const dist = userLocation && latlng ? getDistance(userLocation, latlng) : null;
                  return (
                    <div
                      key={req._id || req.id}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-[#4a7c59]/30 hover:shadow-sm transition-all cursor-pointer"
                      onClick={() => {
                        if (latlng) setMapCenter(latlng);
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: getCategoryColor(req.category) + '18', color: getCategoryColor(req.category) }}
                      >
                        <span className="text-base">{getCategoryIcon(req.category)}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-800 truncate">{req.description}</p>
                        <p className="text-xs text-gray-400">
                          {dist ? `${dist} miles away` : ''}{dist && req.createdAt ? ' • ' : ''}{timeAgo(req.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Map Legend - pinned at bottom of sidebar */}
        <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Map Legend</h4>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <span className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4a7c59]"></span> Open Request
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span> In Progress
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span> Emergency
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]"></span> Resources
            </span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={mapCenter}
          zoom={13}
          className="h-full w-full z-0"
          style={{ height: '100%', width: '100%' }}
        >
          <ChangeMapView
            userLocation={userLocation}
            allMarkers={[
              ...(userLocation ? [userLocation] : []),
              ...searchFilteredRequests.map(req => extractLatLng(req)).filter(pos => pos !== null)
            ]}
          />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* User location */}
          {userLocation && (
            <CircleMarker
              center={userLocation}
              radius={10}
              pathOptions={{ color: '#4a7c59', fillColor: '#4a7c59', fillOpacity: 0.5, weight: 3 }}
            >
              <Popup>
                <div className="text-center p-2 max-w-[250px]">
                  <p className="font-bold text-gray-800 text-sm mb-1">📍 You are here</p>
                  <p className="text-gray-500 text-xs leading-tight">{userAddress || 'Fetching address...'}</p>
                </div>
              </Popup>
            </CircleMarker>
          )}

          {searchFilteredRequests.map((req) => {
            const latlng = extractLatLng(req);
            if (!latlng) return null;
            return (
              <Marker key={req._id || req.id} position={latlng}>
                <Popup>
                  <div className="min-w-[220px] p-2">
                    <div
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-white text-xs font-semibold mb-2"
                      style={{ backgroundColor: getCategoryColor(req.category) }}
                    >
                      <span className="mr-1">{getCategoryIcon(req.category)}</span>
                      {req.category}
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1.5 text-sm leading-tight">{req.description}</h3>
                    <div className="flex items-start text-gray-500 mb-1.5">
                      <svg className="w-3.5 h-3.5 mr-1.5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-xs">{req.location?.address || req.address || 'Address not provided'}</span>
                    </div>
                    <p className="text-gray-400 text-xs">{timeAgo(req.createdAt)}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;