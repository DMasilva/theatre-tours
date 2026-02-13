/**
 * Bookings Service
 * Handles all booking-related API calls
 */

import api from './api';

const bookingsService = {
  /**
   * Get all bookings (Admin only)
   */
  getAllBookings: async (filters = {}) => {
    try {
      const queryString = api.buildQueryString(filters);
      const response = await api.get(`/bookings${queryString}`);
      const data = response?.data ?? response;
      return data?.bookings ? { bookings: data.bookings, pagination: response?.pagination } : data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get my bookings (Authenticated user)
   */
  getMyBookings: async () => {
    try {
      const response = await api.get('/bookings/my_bookings');
      const data = response?.data ?? response;
      return data?.bookings ? { bookings: data.bookings, pagination: response?.pagination } : data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get booking by ID
   */
  getBookingById: async (id) => {
    try {
      const response = await api.get(`/bookings/${id}`);
      const data = response?.data ?? response;
      return data?.booking ? { booking: data.booking } : data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get booking by reference number
   */
  getBookingByReference: async (reference, email) => {
    try {
      const query = email ? `?email=${encodeURIComponent(email)}` : '';
      const response = await api.get(`/bookings/reference/${reference}${query}`, { includeAuth: false });
      const data = response?.data ?? response;
      return data?.booking ? { booking: data.booking } : data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new booking
   */
  createBooking: async (bookingData) => {
    try {
      const payload = {
        trip_id: bookingData.tripId ?? bookingData.trip_id,
        customer_name: bookingData.customerName ?? bookingData.customer_name,
        customer_email: bookingData.customerEmail ?? bookingData.customer_email,
        customer_phone: bookingData.customerPhone ?? bookingData.customer_phone,
        num_travelers: bookingData.numTravelers ?? bookingData.num_travelers,
        travel_date: bookingData.travelDate ?? bookingData.travel_date,
        special_requests: bookingData.specialRequests ?? bookingData.special_requests ?? null,
        price_per_person: bookingData.pricePerPerson ?? bookingData.price_per_person,
        total_price: bookingData.totalPrice ?? bookingData.total_price,
        payment_method: bookingData.paymentMethod ?? bookingData.payment_method,
      };
      // Send auth when available so backend can associate booking with user
      const response = await api.post('/bookings', payload);
      const data = response?.data ?? response;
      return data?.booking ? { booking: data.booking } : data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update booking (Admin only)
   */
  updateBooking: async (id, bookingData) => {
    try {
      const response = await api.put(`/bookings/${id}`, bookingData);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Confirm booking (Admin only)
   */
  confirmBooking: async (id) => {
    try {
      const response = await api.post(`/bookings/${id}/confirm`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cancel booking
   */
  cancelBooking: async (id, reason) => {
    try {
      const response = await api.delete(`/bookings/${id}`, {
        body: reason ? { cancellation_reason: reason } : null,
      });
      return response?.data ?? response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get bookings by status (Admin only)
   */
  getBookingsByStatus: async (status) => {
    try {
      const response = await api.get(`/bookings?status=${status}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get recent bookings (Admin only)
   */
  getRecentBookings: async (limit = 10) => {
    try {
      const response = await api.get(`/bookings?sort_by=created_at&sort_order=desc&per_page=${limit}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },
};

export default bookingsService;
