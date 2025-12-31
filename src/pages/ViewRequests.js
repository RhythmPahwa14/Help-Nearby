import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContextNew";
import { requestsAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const allRequestsData = await requestsAPI.getRequests();
      const openRequests = allRequestsData.filter(request => request.status !== 'in-progress');
      setRequests(openRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleHelp = async (requestId, requesterId) => {
    if (!currentUser) {
      alert("Please log in to offer help.");
      navigate("/login");
      return;
    }
    if (currentUser.uid === requesterId) {
      alert("You cannot accept your own request.");
      return;
    }
    try {
      await requestsAPI.updateRequest(requestId, {
        status: 'in-progress'
      });
      fetchRequests(); 
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Community Help
              <br />
              <span className="text-green-400">Requests</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect with your community and make a difference. Browse help requests or create your own.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => navigate('/post-request')}
              className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              LEARN MORE
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 shadow-lg">
              OUR SERVICES
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    filter === category
                      ? 'bg-green-600 text-white shadow-lg scale-105'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-md border border-white/20'
                  }`}
                >
                  {category === 'all' ? 'All Requests' : `${getCategoryIcon(category)} ${category}`}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-white/20 border-t-green-500 rounded-full animate-spin mx-auto mb-6"></div>
                <p className="text-white text-xl">Loading requests...</p>
              </div>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 max-w-md mx-auto border border-white/20">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-4">No Requests Found</h3>
                <p className="text-gray-300">
                  {filter === 'all' 
                    ? "There are no active requests at the moment." 
                    : `No requests found in the ${filter} category.`
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRequests.map((req, index) => {
                const isButtonDisabled = currentUser?.uid === req.requesterId;
                const getButtonText = () => {
                  if (currentUser?.uid === req.requesterId) return 'Your Request';
                  return 'I Can Help';
                };

                return (
                  <div 
                    key={req.id} 
                    className="bg-white rounded-3xl p-6 shadow-2xl hover:scale-105 transition-all duration-300 group border border-gray-200 request-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Category Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-xl">
                        {getCategoryIcon(req.category)} {req.category}
                      </div>
                      <div className="text-gray-500 text-sm request-date">
                        {req.createdAt?.toDate().toLocaleDateString()}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-3 request-title">
                        {req.description}
                      </h3>
                      
                      <div className="flex items-start text-gray-700 mb-3 request-address">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm request-text">
                          {req.address}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-sm request-date">
                        <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="request-text">Posted: {req.createdAt?.toDate().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleHelp(req.id, req.requesterId)}
                      disabled={isButtonDisabled}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        isButtonDisabled
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 shadow-lg'
                      }`}
                    >
                      <span className="flex items-center justify-center">
                        {!isButtonDisabled && (
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        )}
                        {getButtonText()}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Stats Footer */}
          {!isLoading && filteredRequests.length > 0 && (
            <div className="mt-16 text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 inline-flex items-center border border-white/20">
                <span className="text-2xl mr-3">📊</span>
                <span className="text-white font-semibold text-lg">
                  {filteredRequests.length} active request{filteredRequests.length !== 1 ? 's' : ''} available
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewRequests;
