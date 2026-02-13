import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Grid, Card, IconButton, Chip, Button, useTheme, Rating, CircularProgress
} from '@mui/material';
import { FavoriteBorder, RemoveCircleOutline } from '@mui/icons-material';
import favoritesService from '../../services/favoritesService';

const MyFavorites = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [myFavorites, setMyFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await favoritesService.getFavorites();
        setMyFavorites(response.favorites || []);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setMyFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemove = async (tripId) => {
    try {
      await favoritesService.removeFromFavorites(tripId);
      setMyFavorites(prev => prev.filter(fav => (fav.trip?.id ?? fav.trip_id) !== tripId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>My Favorites</Typography>
          <Typography variant="body2" color="text.secondary">{myFavorites.length} saved trips</Typography>
        </Box>
        <Button variant="outlined" onClick={() => navigate('/trips')}>Browse More Trips</Button>
      </Box>
      <Grid container spacing={2}>
        {myFavorites.map(fav => (
          <Grid item xs={12} sm={6} md={4} key={fav.id}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 2, '&:hover': { boxShadow: theme.shadows[4] } }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }} noWrap>
                    {fav.trip?.title}
                  </Typography>
                  <Chip label={fav.trip?.category === 'domestic' ? 'Domestic' : 'International'} size="small" variant="outlined" sx={{ flexShrink: 0 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" noWrap>{fav.trip?.location}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>${fav.trip?.price}</Typography>
                  <Rating value={fav.trip?.rating_average ?? fav.trip?.average_rating ?? fav.trip?.rating ?? 0} readOnly size="small" precision={0.1} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 1 }}>
                <Button variant="outlined" size="small" onClick={() => navigate(`/trips/${fav.trip?.id}`)}>View</Button>
                <IconButton size="small" onClick={() => handleRemove(fav.trip?.id ?? fav.trip_id ?? fav.tripId)} color="error">
                  <RemoveCircleOutline fontSize="small" />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      {myFavorites.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <FavoriteBorder sx={{ fontSize: 80, color: theme.palette.text.disabled, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>No Favorites Yet</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Start adding trips to your favorites!</Typography>
          <Button variant="contained" onClick={() => navigate('/trips')}>Browse Trips</Button>
        </Box>
      )}
    </Box>
  );
};

export default MyFavorites;
