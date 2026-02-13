/**
 * API Service - Core Configuration
 * Royal Dastinos Tours Frontend
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api/v1';

/**
 * Get authentication token from localStorage
 */
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Set authentication token in localStorage
 */
const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

/**
 * Remove authentication token from localStorage
 */
const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

/**
 * Get current user from localStorage
 */
const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

/**
 * Set current user in localStorage
 */
const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

/**
 * Remove current user from localStorage
 */
const removeCurrentUser = () => {
  localStorage.removeItem('currentUser');
};

/**
 * Build request headers
 */
const getHeaders = (includeAuth = true, customHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

/**
 * Handle API response
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const err = {
      message: body?.message ?? body?.error?.message ?? `HTTP Error ${response.status}: ${response.statusText}`,
      status: response.status,
      ...body,
    };
    throw err;
  }

  // Handle 204 No Content or 200 with empty body (e.g. head :ok)
  if (response.status === 204) {
    return { success: true };
  }
  const text = await response.text();
  if (!text || text.trim() === '') {
    return { success: true };
  }
  try {
    return JSON.parse(text);
  } catch {
    return { success: true };
  }
};

/**
 * Generic API request function
 */
const apiRequest = async (endpoint, options = {}) => {
  const {
    method = 'GET',
    body = null,
    headers = {},
    includeAuth = true,
  } = options;

  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    method,
    headers: getHeaders(includeAuth, headers),
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

/**
 * Generic API request with FormData (for file uploads)
 */
const apiRequestFormData = async (endpoint, formData, options = {}) => {
  const {
    method = 'POST',
    includeAuth = true,
  } = options;

  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {};
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  // Don't set Content-Type for FormData - browser will set it with boundary

  const config = {
    method,
    headers,
    body: formData,
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

/**
 * GET request
 */
const get = (endpoint, options = {}) => {
  return apiRequest(endpoint, { ...options, method: 'GET' });
};

/**
 * POST request
 */
const post = (endpoint, body = null, options = {}) => {
  return apiRequest(endpoint, { ...options, method: 'POST', body });
};

/**
 * PUT request
 */
const put = (endpoint, body = null, options = {}) => {
  return apiRequest(endpoint, { ...options, method: 'PUT', body });
};

/**
 * PATCH request
 */
const patch = (endpoint, body = null, options = {}) => {
  return apiRequest(endpoint, { ...options, method: 'PATCH', body });
};

/**
 * DELETE request (supports optional body for APIs that require it)
 */
const del = (endpoint, options = {}) => {
  return apiRequest(endpoint, { ...options, method: 'DELETE', body: options.body ?? null });
};

/**
 * Build query string from object
 */
const buildQueryString = (params) => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return query ? `?${query}` : '';
};

const api = {
  get,
  post,
  put,
  patch,
  delete: del,
  apiRequest,
  apiRequestFormData,
  buildQueryString,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getCurrentUser,
  setCurrentUser,
  removeCurrentUser,
  API_BASE_URL,
};

export default api;
