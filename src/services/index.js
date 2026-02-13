/**
 * Services Index
 * Central export for all API services
 */

import api from './api';
import authService from './authService';
import tripsService from './tripsService';
import bookingsService from './bookingsService';
import reviewsService from './reviewsService';
import favoritesService from './favoritesService';
import contactService from './contactService';
import newsletterService from './newsletterService';
import paymentsService from './paymentsService';
import adminService from './adminService';
import uploadsService from './uploadsService';

export {
  api,
  authService,
  tripsService,
  bookingsService,
  reviewsService,
  favoritesService,
  contactService,
  newsletterService,
  paymentsService,
  adminService,
  uploadsService,
};

// Default export with all services
const services = {
  api,
  auth: authService,
  trips: tripsService,
  bookings: bookingsService,
  reviews: reviewsService,
  favorites: favoritesService,
  contact: contactService,
  newsletter: newsletterService,
  payments: paymentsService,
  admin: adminService,
  uploads: uploadsService,
};
export default services;
