import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Rating,
  Avatar,
  useTheme,
  CircularProgress
} from '@mui/material';
import { CheckCircle as PublishIcon, Delete as DeleteIcon } from '@mui/icons-material';
import reviewsService from '../../services/reviewsService';

const ReviewsManagement = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [publishedFilter] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const filters = { page: page + 1, per_page: rowsPerPage };
        if (publishedFilter !== '') filters.published = publishedFilter;
        const res = await reviewsService.getAllReviews(filters);
        const list = res?.reviews ?? [];
        setReviews(list);
        setTotalCount(res?.pagination?.total_count ?? res?.pagination?.total ?? list.length);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setReviews([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [page, rowsPerPage, publishedFilter]);

  const handlePublish = async (reviewId) => {
    try {
      await reviewsService.publishReview(reviewId);
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, is_published: !r.is_published } : r));
    } catch (err) {
      console.error('Publish failed:', err);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await reviewsService.deleteReview(reviewId);
      setReviews(prev => prev.filter(r => r.id !== reviewId));
      setTotalCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Reviews Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Moderate and manage customer reviews
          </Typography>
        </Box>
        <Box>
          <Chip
            label={`Published: ${reviews.filter(r => r.is_published ?? r.isPublished).length}`}
            color="success"
            sx={{ mr: 1 }}
          />
          <Chip
            label={`Pending: ${reviews.filter(r => !(r.is_published ?? r.isPublished)).length}`}
            color="warning"
          />
        </Box>
      </Box>

      <TableContainer component={Paper}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.grey[50] }}>
              <TableCell>Customer</TableCell>
              <TableCell>Trip</TableCell>
              <TableCell align="center">Rating</TableCell>
              <TableCell>Review</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => {
              const pub = review.is_published ?? review.isPublished;
              const name = review.reviewer_name ?? review.user?.firstName ?? (review.user_initials || '?');
              const tripTitle = review.trip?.title ?? '-';
              return (
              <TableRow key={review.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                      {(review.user_initials || name || '?').charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {name}
                      </Typography>
                      {(review.is_verified ?? review.isVerified) && (
                        <Chip label="Verified" size="small" color="success" sx={{ height: 16 }} />
                      )}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                    {tripTitle}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Rating value={review.rating} size="small" readOnly />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {review.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 300, display: 'block' }}>
                    {review.comment}
                  </Typography>
                </TableCell>
                <TableCell>
                  {(review.created_at || review.createdAt) ? new Date(review.created_at || review.createdAt).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={pub ? 'Published' : 'Pending'} 
                    color={pub ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  {!pub && (
                    <IconButton size="small" color="success" onClick={() => handlePublish(review.id)}>
                      <PublishIcon />
                    </IconButton>
                  )}
                  <IconButton size="small" color="error" onClick={() => handleDelete(review.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
            })}
          </TableBody>
        </Table>
        )}
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </TableContainer>
    </Box>
  );
};

export default ReviewsManagement;


