/**
 * Trips Service
 * Handles all trip-related API calls
 */

import api from './api';

const tripsService = {
  /**
   * Get all trips with optional filters
   */
  getTrips: async (filters = {}) => {
    try {
      const queryString = api.buildQueryString(filters);
      // Use auth when include_inactive so admin can see inactive trips
      const includeAuth = filters.include_inactive === true;
      const response = await api.get(`/trips${queryString}`, { includeAuth: includeAuth || false });
      const payload = response?.data ?? response;
      return payload?.trips ? { trips: payload.trips, pagination: response?.pagination } : payload;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get trip by ID
   */
  getTripById: async (id, forAdmin = false) => {
    try {
      // Use auth for admin to fetch inactive trips when editing
      const response = await api.get(`/trips/${id}`, { includeAuth: forAdmin });
      // Handle various response shapes: { data: { trip } }, { trip }, or { data: trip }
      const trip = response?.data?.trip ?? response?.data ?? response?.trip ?? response;
      return trip && typeof trip === 'object' && (trip.id != null || trip.title) ? { trip } : { trip: null };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get trip by slug
   */
  getTripBySlug: async (slug) => {
    try {
      const response = await api.get(`/trips/slug/${slug}`, { includeAuth: false });
      const payload = response?.data ?? response;
      const trip = payload?.trip ?? payload;
      return trip ? { trip } : { trip: null };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new trip (Admin only)
   */
  createTrip: async (tripData) => {
    try {
      const response = await api.post('/trips', { trip: tripData });
      const payload = response?.data ?? response;
      return payload?.trip ? { trip: payload.trip } : payload;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update trip (Admin only)
   */
  updateTrip: async (id, tripData) => {
    try {
      const response = await api.put(`/trips/${id}`, { trip: tripData });
      const payload = response?.data ?? response;
      return payload?.trip ? { trip: payload.trip } : payload;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete trip (Admin only)
   */
  deleteTrip: async (id) => {
    try {
      const response = await api.delete(`/trips/${id}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Toggle featured status (Admin only)
   */
  toggleFeatured: async (id) => {
    try {
      const response = await api.patch(`/trips/${id}/toggle_featured`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Increment view count
   */
  incrementView: async (id) => {
    try {
      const response = await api.post(`/trips/${id}/increment_view`, null, { includeAuth: false });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search trips
   */
  searchTrips: async (searchQuery, filters = {}) => {
    try {
      const params = { search: searchQuery, ...filters };
      const queryString = api.buildQueryString(params);
      const response = await api.get(`/trips${queryString}`, { includeAuth: false });
      const payload = response?.data ?? response;
      return payload?.trips ? { trips: payload.trips, pagination: response?.pagination } : payload;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get featured trips
   */
  getFeaturedTrips: async (limit = 6) => {
    try {
      const response = await api.get(`/trips?featured=true&per_page=${limit}`, { includeAuth: false });
      const payload = response?.data ?? response;
      return payload?.trips ? { trips: payload.trips } : payload;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get trips by category
   */
  getTripsByCategory: async (category, filters = {}) => {
    try {
      const params = { category, ...filters };
      const queryString = api.buildQueryString(params);
      const response = await api.get(`/trips${queryString}`, { includeAuth: false });
      const payload = response?.data ?? response;
      return payload?.trips ? { trips: payload.trips, pagination: response?.pagination } : payload;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get popular trips
   */
  getPopularTrips: async (limit = 10) => {
    try {
      const response = await api.get(`/trips?sort=popular&per_page=${limit}`, { includeAuth: false });
      const payload = response?.data ?? response;
      return payload?.trips ? { trips: payload.trips } : payload;
    } catch (error) {
      throw error;
    }
  },
};

export default tripsService;
