import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { requestsAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  // Modal state for offer help
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [offerForm, setOfferForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const handleHelp = async (requestId, requestOwnerId) => {
    if (!currentUser) {
      alert("Please log in to offer help.");
      navigate("/login");
      return;
    }
    const currentUserId = currentUser.id || currentUser._id;
    if (currentUserId === requestOwnerId) {
      alert("You cannot offer help on your own request.");
      return;
    }
    // Open the offer help modal instead of directly updating
    const request = requests.find(r => r.id === requestId || r._id === requestId);
    setSelectedRequest(request);
    setOfferForm({
      name: currentUser.name || '',
      phone: currentUser.phone || '',
      email: currentUser.email || '',
      message: ''
    });
    setSubmitError('');
    setSubmitSuccess(false);
    setShowOfferModal(true);
  };

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    if (!offerForm.name || !offerForm.phone) {
      setSubmitError('Please provide your name and phone number');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const requestId = selectedRequest.id || selectedRequest._id;
      await requestsAPI.offerHelp(requestId, offerForm);
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowOfferModal(false);
        setSubmitSuccess(false);
        fetchRequests();
      }, 2000);
    } catch (error) {
      setSubmitError(error.message || 'Failed to submit offer. Please try again.');
    }
    setIsSubmitting(false);
  };

  const closeModal = () => {
    setShowOfferModal(false);
    setSelectedRequest(null);
    setOfferForm({ name: '', phone: '', email: '', message: '' });
    setSubmitError('');
    setSubmitSuccess(false);
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
    <div className="min-h-screen relative overflow-hidden -mt-16 pt-16">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 min-h-screen pt-24 pb-8">
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
                      : 'bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20'
                  }`}
                  style={filter !== category ? { color: '#000000' } : {}}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRequests.map((req, index) => {
                const requestOwnerId = req.user?._id || req.user || req.requesterId;
                const currentUserId = currentUser?.id || currentUser?._id;
                const isButtonDisabled = currentUserId && currentUserId === requestOwnerId;
                const getButtonText = () => {
                  if (isButtonDisabled) return 'Your Request';
                  return 'Offer Help';
                };

                return (
                  <div 
                    key={req.id} 
                    className="bg-white rounded-2xl p-4 shadow-xl hover:scale-[1.02] transition-all duration-300 group border border-gray-200 request-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Category Badge */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                        {getCategoryIcon(req.category)} {req.category}
                      </div>
                      <div className="text-gray-500 text-xs request-date">
                        {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : ''}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="mb-3">
                      <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 request-title">
                        {req.description}
                      </h3>
                      
                      <div className="flex items-start text-gray-700 mb-2 request-address">
                        <svg className="w-4 h-4 mr-1.5 flex-shrink-0 mt-0.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-xs request-text line-clamp-2">
                          {req.location?.address || req.address || 'Location not specified'}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-xs request-date">
                        <svg className="w-3.5 h-3.5 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="request-text">{req.createdAt ? new Date(req.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : ''}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleHelp(req.id || req._id, requestOwnerId)}
                      disabled={isButtonDisabled}
                      className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                        isButtonDisabled
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                      }`}
                    >
                      <span className="flex items-center justify-center">
                        {!isButtonDisabled && (
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Offer Help Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-black">Offer Help</h2>
              <p className="text-black mt-2 font-medium">Provide your contact details so the requester can reach you</p>
            </div>

            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Thank You!</h3>
                <p className="text-black">Your offer has been submitted successfully. The requester will contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleOfferSubmit} className="space-y-4">
                {submitError && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {submitError}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-black mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={offerForm.name}
                    onChange={(e) => setOfferForm({ ...offerForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-black placeholder-gray-600"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={offerForm.phone}
                    onChange={(e) => setOfferForm({ ...offerForm, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-black placeholder-gray-600"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={offerForm.email}
                    onChange={(e) => setOfferForm({ ...offerForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-black placeholder-gray-600"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    value={offerForm.message}
                    onChange={(e) => setOfferForm({ ...offerForm, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none text-black placeholder-gray-600"
                    rows="3"
                    placeholder="Add a message for the requester..."
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 border border-gray-400 text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Offer'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewRequests;
