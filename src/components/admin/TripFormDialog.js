import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Box,
  IconButton,
  Divider,
  Tabs,
  Tab,
  FormControlLabel,
  Switch,
  Chip,
  InputAdornment,
  Alert,
  Paper
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  AttachMoney as MoneyIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

const TripFormDialog = ({ open, onClose, trip = null, onSave }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Basic Information State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    duration: '',
    price: '',
    currency: 'USD',
    category: 'domestic',
    difficulty_level: 'moderate',
    max_group_size: 15,
    min_age: 5,
    featured: false,
    is_active: true,
    main_image: ''
  });

  // Highlights State – store { id?, highlight } so we can update existing vs create new
  const [highlights, setHighlights] = useState([{ highlight: '' }]);
  const [highlightsToDestroy, setHighlightsToDestroy] = useState([]);

  // Inclusions/Exclusions State – store { id?, item } for Rails nested attributes
  const [inclusions, setInclusions] = useState([{ item: '' }]);
  const [exclusions, setExclusions] = useState([{ item: '' }]);
  const [inclusionsToDestroy, setInclusionsToDestroy] = useState([]);

  // Itinerary State – store with id for updates, track deletions
  const [itinerary, setItinerary] = useState([
    { day: 1, title: '', activities: '', meals: '', accommodation: '' }
  ]);
  const [itinerariesToDestroy, setItinerariesToDestroy] = useState([]);

  // SEO State
  const [seo, setSeo] = useState({
    meta_title: '',
    meta_description: '',
    meta_keywords: ''
  });

  // Load trip data if editing, reset if creating
  useEffect(() => {
    if (!trip) {
      setHighlights([{ highlight: '' }]);
      setHighlightsToDestroy([]);
      setInclusions([{ item: '' }]);
      setExclusions([{ item: '' }]);
      setInclusionsToDestroy([]);
      setItinerary([{ day: 1, title: '', activities: '', meals: '', accommodation: '' }]);
      setItinerariesToDestroy([]);
      return;
    }
    setFormData({
      title: trip.title || '',
      description: trip.description || '',
      location: trip.location || '',
      duration: trip.duration || '',
      price: trip.price || '',
      currency: trip.currency || 'USD',
      category: trip.category || 'domestic',
      difficulty_level: trip.difficulty_level || 'moderate',
      max_group_size: trip.max_group_size || 15,
      min_age: trip.min_age || 5,
      featured: trip.featured || false,
      is_active: trip.is_active !== undefined ? trip.is_active : true,
      main_image: trip.main_image || ''
    });
    setHighlights(trip.highlights?.length
      ? trip.highlights.map(h => ({ id: h.id, highlight: h.highlight || '' }))
      : [{ highlight: '' }]);
    setHighlightsToDestroy([]);
    const inc = trip.inclusions;
    const includedItems = Array.isArray(inc?.included)
      ? inc.included.map(i => ({ id: i.id, item: i.item ?? '' }))
      : (Array.isArray(inc) ? inc.filter(i => i.inclusion_type === 'included').map(i => ({ id: i.id, item: i.item ?? '' })) : []);
    const excludedItems = Array.isArray(inc?.excluded)
      ? inc.excluded.map(i => ({ id: i.id, item: i.item ?? '' }))
      : (Array.isArray(inc) ? inc.filter(i => i.inclusion_type === 'excluded').map(i => ({ id: i.id, item: i.item ?? '' })) : []);
    setInclusions(includedItems.length > 0 ? includedItems : [{ item: '' }]);
    setExclusions(excludedItems.length > 0 ? excludedItems : [{ item: '' }]);
    setInclusionsToDestroy([]);
    setItinerariesToDestroy([]);
    setItinerary(trip.itineraries?.length > 0 ? trip.itineraries : [
      { day: 1, title: '', activities: '', meals: '', accommodation: '' }
    ]);
    setSeo({
      meta_title: trip.meta_title || '',
      meta_description: trip.meta_description || '',
      meta_keywords: trip.meta_keywords || ''
    });
  }, [trip]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSeoChange = (e) => {
    const { name, value } = e.target;
    setSeo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Highlights handlers
  const addHighlight = () => {
    setHighlights([...highlights, { highlight: '' }]);
  };

  const updateHighlight = (index, value) => {
    const newHighlights = [...highlights];
    newHighlights[index] = { ...newHighlights[index], highlight: value };
    setHighlights(newHighlights);
  };

  const removeHighlight = (index) => {
    const item = highlights[index];
    if (item?.id) setHighlightsToDestroy(prev => [...prev, item.id]);
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  // Inclusions handlers
  const addInclusion = () => {
    setInclusions([...inclusions, { item: '' }]);
  };

  const updateInclusion = (index, value) => {
    const newInclusions = [...inclusions];
    newInclusions[index] = { ...newInclusions[index], item: value };
    setInclusions(newInclusions);
  };

  const removeInclusion = (index) => {
    const item = inclusions[index];
    if (item?.id) setInclusionsToDestroy(prev => [...prev, item.id]);
    setInclusions(inclusions.filter((_, i) => i !== index));
  };

  // Exclusions handlers
  const addExclusion = () => {
    setExclusions([...exclusions, { item: '' }]);
  };

  const updateExclusion = (index, value) => {
    const newExclusions = [...exclusions];
    newExclusions[index] = { ...newExclusions[index], item: value };
    setExclusions(newExclusions);
  };

  const removeExclusion = (index) => {
    const item = exclusions[index];
    if (item?.id) setInclusionsToDestroy(prev => [...prev, item.id]);
    setExclusions(exclusions.filter((_, i) => i !== index));
  };

  // Itinerary handlers
  const addItineraryDay = () => {
    setItinerary([
      ...itinerary,
      { 
        day: itinerary.length + 1, 
        title: '', 
        activities: '', 
        meals: '', 
        accommodation: '' 
      }
    ]);
  };

  const updateItinerary = (index, field, value) => {
    const newItinerary = [...itinerary];
    newItinerary[index][field] = value;
    setItinerary(newItinerary);
  };

  const removeItineraryDay = (index) => {
    const day = itinerary[index];
    if (day?.id) setItinerariesToDestroy(prev => [...prev, day.id]);
    const newItinerary = itinerary.filter((_, i) => i !== index);
    newItinerary.forEach((d, idx) => {
      d.day = idx + 1;
    });
    setItinerary(newItinerary);
  };

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.location || !formData.duration || !formData.price) {
        setError('Please fill in all required fields (Basic Information tab)');
        setActiveTab(0);
        setLoading(false);
        return;
      }

      // Prepare data for API (backend expects *_attributes)
      const tripData = {
        ...formData,
        ...seo,
        highlights_attributes: [
          ...highlights
            .filter(h => (h.highlight || '').trim() !== '')
            .map((h, i) => ({
              ...(h.id && { id: h.id }),
              highlight: (h.highlight || '').trim(),
              display_order: i + 1
            })),
          ...highlightsToDestroy.map(id => ({ id, _destroy: true }))
        ],
        inclusions_attributes: [
          ...inclusions
            .filter(i => (i.item || '').trim() !== '')
            .map((x, i) => ({
              ...(x.id && { id: x.id }),
              item: (x.item || '').trim(),
              inclusion_type: 'included',
              display_order: i + 1
            })),
          ...exclusions
            .filter(e => (e.item || '').trim() !== '')
            .map((x, i) => ({
              ...(x.id && { id: x.id }),
              item: (x.item || '').trim(),
              inclusion_type: 'excluded',
              display_order: i + 1
            })),
          ...inclusionsToDestroy.map(id => ({ id, _destroy: true }))
        ],
        itineraries_attributes: [
          ...itinerary
            .filter(day => (day.activities || '').trim() !== '')
            .map((day, i) => ({ ...day, display_order: i + 1 })),
          ...itinerariesToDestroy.map(id => ({ id, _destroy: true }))
        ]
      };

      await onSave(tripData);
      handleClose();
    } catch (err) {
      setError(err.error?.message || 'Failed to save trip');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setActiveTab(0);
    setError(null);
    setHighlightsToDestroy([]);
    setInclusionsToDestroy([]);
    setItinerariesToDestroy([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{trip ? 'Edit Trip' : 'Create New Trip'}</Typography>
          <Chip 
            label={formData.category} 
            color={formData.category === 'domestic' ? 'success' : 'info'}
            size="small"
          />
        </Box>
      </DialogTitle>

      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}
      >
        <Tab label="Basic Info" />
        <Tab label="Highlights" />
        <Tab label="Inclusions" />
        <Tab label="Itinerary" />
        <Tab label="SEO & Settings" />
      </Tabs>

      <DialogContent sx={{ minHeight: 400 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Tab 0: Basic Information */}
        {activeTab === 0 && (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Trip Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., 3-Day Amboseli Safari Adventure"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detailed description of the trip..."
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Amboseli National Park, Kenya"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 3 days, 5 days / 4 nights"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                type="number"
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Currency"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="KES">KES</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <MenuItem value="domestic">Domestic</MenuItem>
                <MenuItem value="international">International</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Difficulty Level"
                name="difficulty_level"
                value={formData.difficulty_level}
                onChange={handleInputChange}
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="moderate">Moderate</MenuItem>
                <MenuItem value="challenging">Challenging</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Max Group Size"
                name="max_group_size"
                value={formData.max_group_size}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Minimum Age"
                name="min_age"
                value={formData.min_age}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Main Image URL"
                name="main_image"
                value={formData.main_image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg or /images/trip.jpg"
              />
            </Grid>
          </Grid>
        )}

        {/* Tab 1: Highlights */}
        {activeTab === 1 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Trip Highlights (Key features that make this trip special)
            </Typography>
            {highlights.map((h, index) => (
              <Box key={h.id || `new-${index}`} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="e.g., See the famous red elephants of Tsavo"
                  value={h.highlight ?? h}
                  onChange={(e) => updateHighlight(index, e.target.value)}
                />
                <IconButton color="error" onClick={() => removeHighlight(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button startIcon={<AddIcon />} onClick={addHighlight}>
              Add Highlight
            </Button>
          </Box>
        )}

        {/* Tab 2: Inclusions/Exclusions */}
        {activeTab === 2 && (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom color="success.main">
                What's Included
              </Typography>
              {inclusions.map((x, index) => (
                <Box key={x.id || `inc-${index}`} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="e.g., Park entrance fees"
                    value={x.item ?? x}
                    onChange={(e) => updateInclusion(index, e.target.value)}
                  />
                  <IconButton size="small" color="error" onClick={() => removeInclusion(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button size="small" startIcon={<AddIcon />} onClick={addInclusion}>
                Add Inclusion
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom color="error.main">
                What's Not Included
              </Typography>
              {exclusions.map((x, index) => (
                <Box key={x.id || `exc-${index}`} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="e.g., Personal expenses"
                    value={x.item ?? x}
                    onChange={(e) => updateExclusion(index, e.target.value)}
                  />
                  <IconButton size="small" color="error" onClick={() => removeExclusion(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button size="small" startIcon={<AddIcon />} onClick={addExclusion}>
                Add Exclusion
              </Button>
            </Grid>
          </Grid>
        )}

        {/* Tab 3: Itinerary */}
        {activeTab === 3 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Day-by-Day Itinerary
            </Typography>
            {itinerary.map((day, index) => (
              <Paper key={day.id || `day-${index}`} sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" color="primary">
                    Day {day.day}
                  </Typography>
                  <IconButton size="small" color="error" onClick={() => removeItineraryDay(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Day Title"
                      placeholder="e.g., Journey to Amboseli"
                      value={day.title}
                      onChange={(e) => updateItinerary(index, 'title', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      size="small"
                      label="Activities"
                      placeholder="Describe what happens on this day..."
                      value={day.activities}
                      onChange={(e) => updateItinerary(index, 'activities', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Meals (Optional)"
                      placeholder="e.g., Breakfast, Lunch, Dinner"
                      value={day.meals}
                      onChange={(e) => updateItinerary(index, 'meals', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Accommodation (Optional)"
                      placeholder="e.g., Luxury Safari Lodge"
                      value={day.accommodation}
                      onChange={(e) => updateItinerary(index, 'accommodation', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
            <Button startIcon={<AddIcon />} onClick={addItineraryDay}>
              Add Day
            </Button>
          </Box>
        )}

        {/* Tab 4: SEO & Settings */}
        {activeTab === 4 && (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Status & Visibility
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(formData.featured)}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      name="featured"
                    />
                  }
                  label="Featured Trip"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(formData.is_active)}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                      name="is_active"
                    />
                  }
                  label="Active (Visible to customers)"
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                SEO Settings (Optional)
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta Title"
                name="meta_title"
                value={seo.meta_title}
                onChange={handleSeoChange}
                placeholder="SEO title for search engines"
                helperText="Leave empty to use trip title"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Meta Description"
                name="meta_description"
                value={seo.meta_description}
                onChange={handleSeoChange}
                placeholder="SEO description for search engines"
                helperText="Leave empty to use trip description"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta Keywords"
                name="meta_keywords"
                value={seo.meta_keywords}
                onChange={handleSeoChange}
                placeholder="safari, kenya, amboseli, wildlife"
                helperText="Comma-separated keywords"
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Saving...' : (trip ? 'Update Trip' : 'Create Trip')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TripFormDialog;
