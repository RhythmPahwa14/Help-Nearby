import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { requestsAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(12);
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

  const categories = [
    { key: 'all', label: 'All Categories', icon: 'apps' },
    { key: 'Groceries', label: 'Grocery', icon: 'shopping_basket' },
    { key: 'Pets', label: 'Pets', icon: 'pets' },
    { key: 'Elderly Care', label: 'Elderly Care', icon: 'elderly' },
    { key: 'Tech Support', label: 'Tech Support', icon: 'devices' },
    { key: 'Household', label: 'Home Repair', icon: 'home_repair_service' },
    { key: 'Transport', label: 'Transportation', icon: 'directions_car' }
  ];

  const getCategoryLabel = (categoryKey) => {
    const category = categories.find(c => c.key === categoryKey);
    return category ? category.label : categoryKey;
  };

  const getTimeAgo = (createdAt) => {
    if (!createdAt) return '';
    const seconds = Math.floor((Date.now() - new Date(createdAt)) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  // Filter, search, and sort
  const filteredAndSortedRequests = requests
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
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'urgent':
          const urgencyA = (Date.now() - new Date(a.createdAt)) / (1000 * 60 * 60);
          const urgencyB = (Date.now() - new Date(b.createdAt)) / (1000 * 60 * 60);
          return urgencyA - urgencyB;
        case 'nearest':
          // For now, just sort by newest as we don't have distance data
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  const visibleRequests = filteredAndSortedRequests.slice(0, visibleCount);
  const hasMore = filteredAndSortedRequests.length > visibleCount;

  const loadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300 min-h-screen">
      <main className="w-full">
        {/* Hero Section / Header */}
        <section className="relative h-[300px] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Community members helping each other" 
              className="w-full h-full object-cover" 
              src="/requests.jpeg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent"></div>
          </div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">Help Needed in Your Community</h1>
            <p className="text-lg text-white/95 max-w-2xl mx-auto font-medium drop-shadow-md">Browse active requests and lend a hand to your neighbors. Every small act of kindness strengthens our community.</p>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-4 md:p-6 border border-neutral-soft dark:border-zinc-800">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">search</span>
                <input 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-soft dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:border-primary focus:ring-2 focus:ring-primary text-slate-900 dark:text-slate-100 placeholder:text-slate-400" 
                  placeholder="Search by keyword or category (e.g., Grocery, Tech)" 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {categories.map((category) => (
                  <button 
                    key={category.key}
                    onClick={() => setFilter(category.key)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                      filter === category.key
                        ? 'bg-slate-800 dark:bg-slate-700 text-white'
                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{category.icon}</span> {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Requests Grid */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Nearby Requests</h2>
              <p className="text-slate-500 dark:text-slate-400">
                {isLoading ? 'Loading...' : `Showing ${visibleRequests.length} of ${filteredAndSortedRequests.length} active requests`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-500">Sort by:</span>
              <select 
                className="bg-transparent border-none text-sm font-bold text-slate-900 dark:text-slate-100 focus:ring-0 cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="urgent">Urgent</option>
                <option value="nearest">Nearest</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : visibleRequests.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-slate-400 text-lg">No requests found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleRequests.map((req) => {
                  const requestOwnerId = req.user?._id || req.user || req.requesterId;
                  const currentUserId = currentUser?.id || currentUser?._id;
                  const isButtonDisabled = currentUserId && currentUserId === requestOwnerId;
                  const helperCount = req.helperOffers?.length || 0;

                  return (
                    <div 
                      key={req.id || req._id}
                      className="bg-white dark:bg-zinc-900 rounded-2xl border border-neutral-soft dark:border-zinc-800 hover:shadow-lg transition-all group overflow-hidden"
                    >
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary-dark text-xs font-bold uppercase tracking-wider">
                            {getCategoryLabel(req.category)}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">{getTimeAgo(req.createdAt)}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-primary transition-colors">
                          {req.description}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                          {req.location?.address || req.address || 'Location not specified'}
                        </p>
                        <div className="flex items-center justify-between pt-6 border-t border-neutral-soft dark:border-zinc-800">
                          <div className="flex items-center gap-3">
                            <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="material-symbols-outlined text-primary text-[20px]">person</span>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                {req.user?.name || 'Anonymous'}
                              </p>
                              {helperCount > 0 && (
                                <p className="text-xs text-green-600 dark:text-green-400">
                                  {helperCount} {helperCount === 1 ? 'offer' : 'offers'}
                                </p>
                              )}
                            </div>
                          </div>
                          <button 
                            onClick={() => handleHelp(req.id || req._id, requestOwnerId)}
                            disabled={isButtonDisabled}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all transform active:scale-95 shadow-sm ${
                              isButtonDisabled
                                ? 'bg-slate-200 dark:bg-zinc-800 text-slate-400 cursor-not-allowed'
                                : 'bg-primary hover:bg-primary-dark text-white'
                            }`}
                          >
                            {isButtonDisabled ? 'Your Request' : 'Offer Help'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="mt-12 text-center">
                  <button 
                    onClick={loadMore}
                    className="px-8 py-3 rounded-xl bg-neutral-soft dark:bg-zinc-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-primary/20 transition-all border border-transparent hover:border-primary/30"
                  >
                    Load More Requests
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Post a Request CTA */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <div className="bg-primary/10 dark:bg-primary/20 rounded-2xl p-8 text-center border border-primary/20">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Need Help with Something?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              Post your request and connect with helpful neighbors in your community who are ready to assist.
            </p>
            <button
              onClick={() => navigate('/help-request')}
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-sm inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              Post a Request
            </button>
          </div>
        </section>
      </main>

      {/* Offer Help Modal */}
      {showOfferModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md shadow-2xl border border-neutral-soft dark:border-zinc-800 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-center relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="material-symbols-outlined text-primary text-[32px]">volunteer_activism</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Offer Your Help</h2>
              <p className="text-white/90 text-sm mt-1">Share your contact details with the requester</p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleOfferSubmit} className="space-y-4">
                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-600 dark:text-red-400 text-sm flex items-center">
                    <span className="material-symbols-outlined mr-2">error</span>
                    {submitError}
                  </div>
                )}

                <div>
                  <label className="block text-slate-900 dark:text-slate-100 text-sm font-semibold mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={offerForm.name}
                    onChange={(e) => setOfferForm({ ...offerForm, name: e.target.value })}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 bg-neutral-soft/50 dark:bg-zinc-800 border border-neutral-soft dark:border-zinc-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 dark:text-slate-100 text-sm font-semibold mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={offerForm.phone}
                    onChange={(e) => setOfferForm({ ...offerForm, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    required
                    className="w-full px-4 py-3 bg-neutral-soft/50 dark:bg-zinc-800 border border-neutral-soft dark:border-zinc-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 dark:text-slate-100 text-sm font-semibold mb-2">
                    Email <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={offerForm.email}
                    onChange={(e) => setOfferForm({ ...offerForm, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-neutral-soft/50 dark:bg-zinc-800 border border-neutral-soft dark:border-zinc-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 dark:text-slate-100 text-sm font-semibold mb-2">
                    Message <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={offerForm.message}
                    onChange={(e) => setOfferForm({ ...offerForm, message: e.target.value })}
                    placeholder="Add a message for the requester..."
                    rows="3"
                    className="w-full px-4 py-3 bg-neutral-soft/50 dark:bg-zinc-800 border border-neutral-soft dark:border-zinc-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3.5 px-6 bg-neutral-soft dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 border border-neutral-soft dark:border-zinc-800 text-slate-900 dark:text-slate-100 font-semibold rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Offer'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewRequests;
