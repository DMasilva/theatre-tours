/**
 * Favorites Service
 * Handles all favorite-related API calls
 */

import api from './api';

const favoritesService = {
  /**
   * Get user's favorites
   */
  getFavorites: async () => {
    try {
      const response = await api.get('/favorites');
      const data = response?.data ?? response;
      return data?.favorites ? { favorites: data.favorites, pagination: response?.pagination } : data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Add trip to favorites
   */
  addToFavorites: async (tripId) => {
    try {
      const response = await api.post('/favorites', { trip_id: tripId });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Remove trip from favorites
   */
  removeFromFavorites: async (tripId) => {
    try {
      const response = await api.delete(`/favorites/${tripId}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Check if trip is favorited
   */
  checkFavorite: async (tripId) => {
    try {
      const response = await api.get(`/favorites/check/${tripId}`);
      const data = response?.data ?? response;
      return data?.is_favorited !== undefined ? { is_favorited: data.is_favorited, isFavorited: data.is_favorited } : data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Toggle favorite status
   */
  toggleFavorite: async (tripId) => {
    try {
      const checkResponse = await favoritesService.checkFavorite(tripId);
      if (checkResponse.isFavorited || checkResponse.is_favorited) {
        return await favoritesService.removeFromFavorites(tripId);
      } else {
        return await favoritesService.addToFavorites(tripId);
      }
    } catch (error) {
      throw error;
    }
  },
};

export default favoritesService;
