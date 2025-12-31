const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  let data;
  try {
    data = await response.json();
  } catch (err) {
    const text = await response.text();
    throw new Error(`Invalid JSON response (status ${response.status}): ${text.slice(0, 200)}`);
  }

  if (!response.ok) {
    throw new Error((data && data.message) || `HTTP error! status: ${response.status}`);
  }
  return data;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    return await handleResponse(response);
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

export const requestsAPI = {
  getRequests: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });
    const queryString = params.toString();
    const url = `${API_BASE_URL}/help-requests${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    const data = await handleResponse(response);
    return data.data || [];
  },

  getNearbyRequests: async (longitude, latitude, radius = 10) => {
    const response = await fetch(`${API_BASE_URL}/help-requests/nearby?longitude=${longitude}&latitude=${latitude}&radius=${radius}`, {
      headers: getAuthHeaders()
    });
    const data = await handleResponse(response);
    return data.data || [];
  },

  createRequest: async (requestData) => {
    const response = await fetch(`${API_BASE_URL}/help-requests`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(requestData)
    });
    const data = await handleResponse(response);
    return data.data;
  },

  getMyRequests: async () => {
    const response = await fetch(`${API_BASE_URL}/help-requests`, {
      headers: getAuthHeaders()
    });
    const data = await handleResponse(response);
    return data.data || [];
  },

  getUserRequests: async () => {
    const response = await fetch(`${API_BASE_URL}/help-requests`, {
      headers: getAuthHeaders()
    });
    const data = await handleResponse(response);
    return data.data || [];
  },

  acceptRequest: async (requestId) => {
    const response = await fetch(`${API_BASE_URL}/help-requests/${requestId}/accept`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    const data = await handleResponse(response);
    return data.data;
  },

  completeRequest: async (requestId) => {
    const response = await fetch(`${API_BASE_URL}/help-requests/${requestId}/complete`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    const data = await handleResponse(response);
    return data.data;
  },

  rateRequest: async (requestId, rating, feedback) => {
    const response = await fetch(`${API_BASE_URL}/help-requests/${requestId}/rate`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ rating, feedback })
    });
    const data = await handleResponse(response);
    return data.data;
  },

  updateRequest: async (requestId, updates) => {
    const response = await fetch(`${API_BASE_URL}/help-requests/${requestId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    const data = await handleResponse(response);
    return data.data;
  },

  deleteRequest: async (requestId) => {
    const response = await fetch(`${API_BASE_URL}/help-requests/${requestId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await handleResponse(response);
  }
};

export const usersAPI = {
  getNearbyHelpers: async (longitude, latitude, radius = 10) => {
    const response = await fetch(`${API_BASE_URL}/users/nearby-helpers?longitude=${longitude}&latitude=${latitude}&radius=${radius}`, {
      headers: getAuthHeaders()
    });
    const data = await handleResponse(response);
    return data.data || [];
  },

  getUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: getAuthHeaders()
    });
    const data = await handleResponse(response);
    return data.data;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export default { authAPI, requestsAPI, usersAPI };