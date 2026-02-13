/**
 * Payments Service
 * Handles all payment-related API calls
 */

import api from './api';

const paymentsService = {
  /**
   * Initiate payment
   */
  initiatePayment: async (paymentData) => {
    try {
      const response = await api.post('/payments/initiate', {
        booking_id: paymentData.bookingId,
        amount: paymentData.amount,
        currency: paymentData.currency || 'USD',
        payment_method: paymentData.paymentMethod,
        payment_gateway: paymentData.paymentGateway,
      });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get payment by ID
   */
  getPaymentById: async (id) => {
    try {
      const response = await api.get(`/payments/${id}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get payments by booking ID
   */
  getPaymentsByBooking: async (bookingId) => {
    try {
      const response = await api.get(`/payments/booking/${bookingId}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Process refund (Admin only)
   */
  processRefund: async (paymentId, refundData) => {
    try {
      const response = await api.post(`/payments/${paymentId}/refund`, {
        amount: refundData.amount,
        reason: refundData.reason,
      });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },
};

export default paymentsService;
