import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { requestsAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
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
    const request = requests.find(r => r.id === requestId || r._id === requestId);
    setSelectedRequest(request);
    setOfferForm({
      name: currentUser.name || '',
      phone: currentUser.phone || '',
      email: currentUser.email || '',
      message: ''
    });
    setSubmitError('');
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
      setShowOfferModal(false);
      setSelectedRequest(null);
      setOfferForm({ name: '', phone: '', email: '', message: '' });
      fetchRequests();
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
  };

  // SVG Icons for categories
  const CategoryIcon = ({ type, className = "w-5 h-5" }) => {
    const icons = {
      all: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
      General: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      Groceries: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      Medical: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
      Transport: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-8 5h8m-4-9v18m-7-4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
      Household: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    };
    return icons[type] || icons.General;
  };

  const categories = [
    { key: 'all', label: 'All Requests', color: 'from-slate-500 to-slate-600' },
    { key: 'General', label: 'General', color: 'from-gray-500 to-gray-600' },
    { key: 'Groceries', label: 'Groceries', color: 'from-green-500 to-emerald-600' },
    { key: 'Medical', label: 'Medical', color: 'from-red-500 to-rose-600' },
    { key: 'Transport', label: 'Transport', color: 'from-blue-500 to-cyan-600' },
    { key: 'Household', label: 'Household', color: 'from-orange-500 to-amber-600' }
  ];

  const getCategoryInfo = (categoryKey) => {
    return categories.find(c => c.key === categoryKey) || categories[1];
  };

  const getUrgencyLevel = (createdAt) => {
    if (!createdAt) return 'normal';
    const hoursSinceCreated = (Date.now() - new Date(createdAt)) / (1000 * 60 * 60);
    if (hoursSinceCreated < 2) return 'urgent';
    if (hoursSinceCreated < 24) return 'recent';
    return 'normal';
  };

  const getTimeAgo = (createdAt) => {
    if (!createdAt) return '';
    const seconds = Math.floor((Date.now() - new Date(createdAt)) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(createdAt).toLocaleDateString();
  };

  // Filter and search
  const filteredRequests = requests
    .filter(req => filter === 'all' || req.category === filter)
    .filter(req => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        req.description?.toLowerCase().includes(query) ||
        req.location?.address?.toLowerCase().includes(query) ||
        req.address?.toLowerCase().includes(query) ||
        req.category?.toLowerCase().includes(query)
      );
    });

  // Stats
  const stats = {
    total: requests.length,
    urgent: requests.filter(r => getUrgencyLevel(r.createdAt) === 'urgent').length,
    helped: requests.filter(r => r.helperOffers?.length > 0).length
  };

  return (
    <div className="min-h-screen relative overflow-hidden -mt-16 pt-16">
      {/* Clean Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 z-0"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/50 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-screen pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <span className="animate-pulse mr-2 h-2 w-2 bg-green-400 rounded-full"></span>
              <span className="text-green-400 text-sm font-medium">{stats.total} Active Requests</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Community
              <span className="block bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Help Requests
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Make a difference in someone's life today. Browse requests from your community and offer your support.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center px-5 py-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl border border-red-500/30">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">{stats.urgent}</div>
                  <div className="text-xs text-red-300">Urgent</div>
                </div>
              </div>
              <div className="flex items-center px-5 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl border border-green-500/30">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">{stats.helped}</div>
                  <div className="text-xs text-green-300">Receiving Help</div>
                </div>
              </div>
              <div className="flex items-center px-5 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-2xl border border-blue-500/30">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">{stats.total}</div>
                  <div className="text-xs text-blue-300">Total Active</div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by description, location, or category..."
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/post-request')}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.5)]"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Request
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button 
                onClick={() => navigate('/map')}
                className="group px-8 py-4 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  View Map
                </span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setFilter(category.key)}
                  className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 overflow-hidden ${
                    filter === category.key
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                      : 'bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white hover:scale-105'
                  }`}
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2"><CategoryIcon type={category.key} className="w-5 h-5" /></span>
                    {category.label}
                    {filter === category.key && (
                      <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                        {category.key === 'all' ? requests.length : requests.filter(r => r.category === category.key).length}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-green-500/30 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-transparent border-t-green-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-2 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin animation-delay-150"></div>
                </div>
                <p className="text-white text-xl font-medium">Loading requests...</p>
                <p className="text-gray-400 text-sm mt-2">Fetching community help requests</p>
              </div>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 max-w-lg mx-auto border border-white/10">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No Requests Found</h3>
                <p className="text-gray-400 mb-6">
                  {searchQuery 
                    ? `No results for "${searchQuery}". Try a different search term.`
                    : filter === 'all' 
                      ? "There are no active requests at the moment." 
                      : `No requests found in the ${filter} category.`
                  }
                </p>
                <button
                  onClick={() => { setFilter('all'); setSearchQuery(''); }}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((req, index) => {
                const requestOwnerId = req.user?._id || req.user || req.requesterId;
                const currentUserId = currentUser?.id || currentUser?._id;
                const isButtonDisabled = currentUserId && currentUserId === requestOwnerId;
                const helperCount = req.helperOffers?.length || 0;
                const hasUserOffered = req.helperOffers?.some(
                  offer => offer.user === currentUserId || offer.user?._id === currentUserId
                );
                const urgency = getUrgencyLevel(req.createdAt);
                const categoryInfo = getCategoryInfo(req.category);

                const getButtonText = () => {
                  if (isButtonDisabled) return 'Your Request';
                  if (hasUserOffered) return 'You Offered Help';
                  if (helperCount > 0) return `Offer Help (${helperCount} ${helperCount === 1 ? 'offer' : 'offers'})`;
                  return 'Offer Help';
                };

                return (
                  <div 
                    key={req.id || req._id} 
                    className="group relative bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(255,255,255,0.1)]"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Urgency Indicator */}
                    {urgency === 'urgent' && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="inline-flex items-center px-3 py-1 bg-red-500/90 text-white text-xs font-bold rounded-full animate-pulse">
                          <span className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></span>
                          URGENT
                        </span>
                      </div>
                    )}

                    {/* Category Gradient Header */}
                    <div className={`h-2 bg-gradient-to-r ${categoryInfo.color}`}></div>

                    <div className="p-6">
                      {/* Top Section */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`inline-flex items-center px-3 py-1.5 bg-gradient-to-r ${categoryInfo.color} rounded-xl text-white text-sm font-semibold`}>
                          <span className="mr-1.5"><CategoryIcon type={req.category} className="w-4 h-4" /></span>
                          {req.category}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {getTimeAgo(req.createdAt)}
                        </div>
                      </div>

                      {/* Description */}
                      <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-green-300 transition-colors duration-300">
                        {req.description}
                      </h3>

                      {/* Location */}
                      <div className="flex items-start text-gray-400 mb-4">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm line-clamp-2">
                          {req.location?.address || req.address || 'Location not specified'}
                        </span>
                      </div>

                      {/* Helper Count Badge */}
                      {helperCount > 0 && (
                        <div className="flex items-center mb-4">
                          <div className="flex -space-x-2">
                            {[...Array(Math.min(helperCount, 3))].map((_, i) => (
                              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-white/20 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                              </div>
                            ))}
                            {helperCount > 3 && (
                              <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
                                <span className="text-xs text-white">+{helperCount - 3}</span>
                              </div>
                            )}
                          </div>
                          <span className="ml-3 text-sm text-green-400 font-medium">
                            {helperCount} {helperCount === 1 ? 'person' : 'people'} offering help
                          </span>
                        </div>
                      )}

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>

                      {/* Action Button */}
                      <button
                        onClick={() => handleHelp(req.id || req._id, requestOwnerId)}
                        disabled={isButtonDisabled || hasUserOffered}
                        className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                          isButtonDisabled
                            ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
                            : hasUserOffered
                              ? 'bg-green-500/20 text-green-400 cursor-default border border-green-500/30'
                              : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:scale-[1.02]'
                        }`}
                      >
                        <span className="flex items-center justify-center">
                          {isButtonDisabled ? (
                            <>
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              Your Request
                            </>
                          ) : hasUserOffered ? (
                            <>
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              You Offered Help
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              {getButtonText()}
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Section / CTA */}
          {!isLoading && filteredRequests.length > 0 && (
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 backdrop-blur-md rounded-3xl p-8 border border-green-500/20 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-3">Ready to Make a Difference?</h3>
                <p className="text-gray-400 mb-6">
                  Your small act of kindness can have a huge impact on someone's life.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center px-4 py-2 bg-white/5 rounded-full">
                    <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    <span className="text-white font-medium">{filteredRequests.length} requests available</span>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-white/5 rounded-full">
                    <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    <span className="text-white font-medium">Join the helpers</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Offer Help Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl w-full max-w-md shadow-2xl border border-white/10 overflow-hidden animate-in">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Offer Your Help</h2>
              <p className="text-green-100 text-sm mt-1">Share your contact details with the requester</p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleOfferSubmit} className="space-y-4">
                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm flex items-center">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {submitError}
                  </div>
                )}

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={offerForm.name}
                    onChange={(e) => setOfferForm({ ...offerForm, name: e.target.value })}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={offerForm.phone}
                    onChange={(e) => setOfferForm({ ...offerForm, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Email <span className="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={offerForm.email}
                    onChange={(e) => setOfferForm({ ...offerForm, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Message <span className="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={offerForm.message}
                    onChange={(e) => setOfferForm({ ...offerForm, message: e.target.value })}
                    placeholder="Add a message for the requester..."
                    rows="3"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3.5 px-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        Submit Offer
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        .animate-in {
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default ViewRequests;
