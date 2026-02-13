/**
 * Reviews Service
 * Handles all review-related API calls
 */

import api from './api';

const reviewsService = {
  /**
   * Get current user's reviews
   */
  getMyReviews: async (filters = {}) => {
    try {
      const queryString = api.buildQueryString(filters);
      const response = await api.get(`/reviews/my_reviews${queryString}`);
      const data = response?.data ?? response;
      return {
        reviews: data?.reviews ?? [],
        pagination: response?.pagination ?? {},
      };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all reviews (Admin only)
   */
  getAllReviews: async (filters = {}) => {
    try {
      const queryString = api.buildQueryString(filters);
      const response = await api.get(`/reviews${queryString}`);
      const data = response?.data ?? response;
      return {
        reviews: data?.reviews ?? [],
        pagination: response?.pagination ?? {},
      };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get reviews by trip ID
   */
  getReviewsByTrip: async (tripId, filters = {}) => {
    try {
      const queryString = api.buildQueryString(filters);
      const response = await api.get(`/reviews/trip/${tripId}${queryString}`, { includeAuth: false });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get published reviews by trip ID
   */
  getPublishedReviewsByTrip: async (tripId) => {
    try {
      const response = await api.get(`/reviews/trip/${tripId}?published=true`, { includeAuth: false });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new review
   */
  createReview: async (reviewData) => {
    try {
      const response = await api.post('/reviews', {
        trip_id: reviewData.tripId,
        booking_id: reviewData.bookingId,
        rating: reviewData.rating,
        title: reviewData.title,
        comment: reviewData.comment,
      });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update review
   */
  updateReview: async (id, reviewData) => {
    try {
      const response = await api.put(`/reviews/${id}`, {
        rating: reviewData.rating,
        title: reviewData.title,
        comment: reviewData.comment,
      });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete review
   */
  deleteReview: async (id) => {
    try {
      const response = await api.delete(`/reviews/${id}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Publish review (Admin only)
   */
  publishReview: async (id) => {
    try {
      const response = await api.patch(`/reviews/${id}/publish`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Mark review as helpful
   */
  markAsHelpful: async (id) => {
    try {
      const response = await api.post(`/reviews/${id}/helpful`, null, { includeAuth: false });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },
};

export default reviewsService;
