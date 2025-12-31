import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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

function MapView() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [center, setCenter] = useState([30.7333, 76.7794]);
  const [userLocation, setUserLocation] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      try {
        const allRequests = await requestsAPI.getRequests();
        if (!mounted) return;
        setRequests(allRequests.filter((req) => req.status !== "in-progress"));
      } catch (error) {
        console.error("Error fetching requests for map:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    const tryDetectAndFetchNearby = () => {
      if (!("geolocation" in navigator)) {
        fetchAll();
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          if (!mounted) return;
          setCenter([latitude, longitude]);
          setUserLocation([latitude, longitude]);
          try {
            // Ensure your API expects (lng, lat) or (lat, lng) — adjust order if needed.
            const nearby = await requestsAPI.getNearbyRequests(longitude, latitude, 10);
            if (!mounted) return;
            setRequests(nearby.filter((req) => req.status !== "in-progress"));
          } catch (err) {
            console.error("Error fetching nearby requests:", err);
            fetchAll();
          } finally {
            if (mounted) setIsLoading(false);
          }
        },
        (err) => {
          console.warn("Geolocation failed or permission denied, loading all requests", err);
          fetchAll();
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    };

    tryDetectAndFetchNearby();

    return () => {
      mounted = false;
    };
  }, []);

  // Backend category values (lowercase) -> display mapping
  const categoryDisplay = {
    medical: "Medical",
    emergency: "Emergency",
    transport: "Transport",
    food: "Groceries",
    shelter: "Shelter",
    assistance: "General",
    other: "Other",
  };

  const categories = ["all", ...Object.values(categoryDisplay)];

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((req) => {
          const disp = categoryDisplay[req.category] || categoryDisplay.other;
          return disp === filter;
        });

  const getCategoryIcon = (category) => {
    const icons = {
      General: "🔧",
      Groceries: "🛒",
      Medical: "🏥",
      Transport: "🚗",
      Household: "🏠",
      Emergency: "⚠️",
      Shelter: "🏕️",
      Other: "📝",
    };
    return icons[category] || "📝";
  };

  const getCategoryColor = (category) => {
    const colors = {
      General: "#3b82f6",
      Groceries: "#10b981",
      Medical: "#ef4444",
      Transport: "#f59e0b",
      Household: "#8b5cf6",
      Emergency: "#dc2626",
      Shelter: "#06b6d4",
      Other: "#6b7280",
    };
    return colors[category] || "#6b7280";
  };

  const extractLatLng = (req) => {
    // Model stores GeoJSON: location.coordinates = [lng, lat]
    const coords = req?.location?.coordinates;
    if (!coords || coords.length < 2) return null;
    return [coords[1], coords[0]];
  };

  const formatDate = (d) => {
    if (!d) return "";
    const date = d instanceof Date ? d : new Date(d);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-black/90 via-black/80 to-black/90">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-green-500 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-white text-xl">Loading Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen relative">
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg border border-white/20 text-white font-semibold transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Back
              </button>

              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <h1 className="text-white font-bold text-xl">Community Map</h1>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
              <span className="text-white font-semibold text-sm">
                {filteredRequests.length} active request{filteredRequests.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  filter === category ? "bg-green-600 text-white shadow-lg scale-105" : "bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:scale-105"
                }`}
              >
                {category === "all" ? "All Requests" : `${getCategoryIcon(category)} ${category}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-32 h-full w-full">
        <MapContainer center={center} zoom={12} className="h-full w-full z-0" style={{ background: "linear-gradient(45deg, #1e293b, #334155)" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />

          {filteredRequests.map((req) => {
            const latlng = extractLatLng(req);
            if (!latlng) return null;
            const dispCategory = categoryDisplay[req.category] || "Other";
            return (
              <Marker key={req._id || req.id || `${latlng[0]}-${latlng[1]}`} position={latlng}>
                <Popup>
                  <div className="min-w-[250px] p-2">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-semibold mb-3" style={{ backgroundColor: getCategoryColor(dispCategory) }}>
                      <span className="mr-1">{getCategoryIcon(dispCategory)}</span>
                      {dispCategory}
                    </div>

                    <h3 className="font-bold text-gray-800 mb-2 text-base leading-tight">{req.description}</h3>

                    <div className="flex items-start text-gray-600 mb-2">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{req.location?.address || req.address || "Address not provided"}</span>
                    </div>

                    <div className="flex items-center text-gray-500 text-xs">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatDate(req.createdAt)}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {userLocation ? (
            <Marker key="__user" position={userLocation}>
              <Popup>You are here</Popup>
            </Marker>
          ) : null}
        </MapContainer>
      </div>

      <div className="absolute bottom-6 right-6 z-[1000] bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl">
        <h3 className="text-white font-semibold mb-2 text-sm">Map Legend</h3>
        <div className="space-y-1">
          {Object.values(categoryDisplay).map((category) => (
            <div key={category} className="flex items-center text-xs">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getCategoryColor(category) }}></div>
              <span className="text-white/80">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MapView;