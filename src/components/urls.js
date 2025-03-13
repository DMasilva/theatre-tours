import truck from '../images/truck.jpg';
import homepages from '../images/homepage.jpg';
import hotair from '../images/hotair.jpg';
import lion from '../images/lion.jpg';
import lions from '../images/lions.jpg';
import elephant from '../images/elephant.jpg';
import girrafes from '../images/girrafes.jpg';
import elephants from '../images/elephants.jpg';
import flamingo from '../images/flamingo.jpg';
import zebra from '../images/zebra.jpg'



const urls = [
  { url: girrafes, name: 'Girrafe Center' },
  { url: flamingo, name: 'Lake Nakuru' },
  { url: hotair, name: 'Hot Air Baloons' },
  { url: lions, name: 'National Park' },
  { url: elephant, name: 'Serengeti' },

];

const trips = [
  {
    id: 1,
    image: girrafes,
    title: '2-Day Tsavo East Safari from Diani or Mombasa',
    description: 'Discover the wild beauty of Tsavo East National Park on a one-day safari from Diani. Covering 345 km, this adventure takes you through diverse landscapes to witness the park’s iconic wildlife. You will spot elephants, lions, and buffalos roaming amidst the vast savannah and marvel at the striking Lugard Falls and Aruba Dam. With a professional guide, this unforgettable journey offers a thrilling glimpse into Kenya’s pristine wilderness.',
    itinerary: [
      {
        day: 1,
        activities: 'Diani Beach to Tsavo East National Park (240km, 4 hours). Pick up from your beach hotel at 5:30am and depart for Tsavo East National Park. Upon entering the park, the driver will open the roof of your bus so you can stand up and feel the wind in your hair. Welcome to Africa! The safari has begun! Tsavo is Kenya’s largest national park and is split east and west by a highway. Arrive and enjoy a game drive en route to the lodge. Check in at Voi Safari Lodge in time for lunch, relax, and later head back into the park for your afternoon game drive. Return to the lodge as the sun sets.',
      },
    ],
    packageIncludes: [
      'Park fees (For non-residents)',
      'All activities (Unless labeled as optional)',
      'A professional driver/guide',
      'All transportation (Unless labeled as optional)',
      'All Taxes/VAT',
      'Meals (As specified in the day-by-day section)',
      'Drinking water (On all days)',
    ],
    packageExcludes: [
      'International flights (From/to home)',
      'Roundtrip airport transfer',
      'Additional accommodation before and at the end of the tour',
      'Tips (Tipping guideline US$10.00 pp per day)',
      'Personal items (Souvenirs, travel insurance, visa fees, etc.)',
      'Government imposed increase of taxes and/or park fees',
    ],
    highlights: [
      'Spotting elephants, lions, and buffalos',
      'Visiting Lugard Falls and Aruba Dam',
      'Professional guide with local expertise',
      'Thrilling game drives',
    ],
    location: 'Tsavo East National Park, Kenya',
    duration: '2 days',
    price: '$200 per person',
  },
  {
    id: 2,
    image: zebra,
    title: '7 Days Samburu, Ol Pejeta, Naivasha and Masai Mara',
    description: 'This 7 days 6 nights safari features Samburu National Park in the north of Kenya, Ol Pejeta and Masai Mara National Reserve.',
    itinerary: [
      {
        day: 1,
        activities: 'Nairobi - Samburu: Pick up from your hotel in Nairobi, head north through agricultural regions, cross the equator at Nanyuki, arrive at Samburu National Reserve for lunch and afternoon game drive. Accommodation: Ashnil Samburu Camp.',
      },
      {
        day: 2,
        activities: 'Samburu: Early morning game drive, breakfast, leisure time, evening game drive. Accommodation: Ashnil Samburu Camp.',
      },
      {
        day: 3,
        activities: 'Samburu - Ol Pejeta: Game drive en route to Nanyuki, lunch at Comfort Garden O Pejeta, evening game drive at Ol Pejeta Conservancy. Accommodation: Sweetwaters Serena Camp.',
      },
      {
        day: 4,
        activities: 'Ol Pejeta - Lake Naivasha: Depart from Mt Kenya, arrive at Lake Naivasha for lunch, cycling at Hells gate National park, dinner at Lake Naivasha Sopa Lodge.',
      },
      {
        day: 5,
        activities: 'Lake Naivasha - Masai Mara: Boat ride on lake Naivasha, depart for Masai Mara, arrive for lunch and afternoon game drive. Accommodation: Ashnil Mara Camp.',
      },
      {
        day: 6,
        activities: 'Masai Mara: Full day game drive, picnic lunch, evening return to camp. Accommodation: Ashnil Mara Camp.',
      },
      {
        day: 7,
        activities: 'Masai Mara - Nairobi: Early morning game drive, breakfast, check out and return to Nairobi.',
      },
    ],
    packageIncludes: [
      'Park fees (For non-residents)',
      'All activities (Unless labeled as optional)',
      'A professional driver/guide',
      'All transportation (Unless labeled as optional)',
      'All Taxes/VAT',
      'Meals (As specified in the day-by-day section)',
      'Drinking water (On all days)',
    ],
    packageExcludes: [
      'International flights (From/to home)',
      'Roundtrip airport transfer',
      'Additional accommodation before and at the end of the tour',
      'Tips (Tipping guideline US$10.00 pp per day)',
      'Personal items (Souvenirs, travel insurance, visa fees, etc.)',
      'Government imposed increase of taxes and/or park fees',
    ],
    highlights: [
      'Samburu Special Five',
      'Game drives in Masai Mara',
      'Boat ride on Lake Naivasha',
      'Cycling at Hells gate National park',
    ],
    location: 'Kenya',
    duration: '7 days',
    price: '$1400 per person',
  },
  {
    id: 3,
    image: lion,
    title: '7 Days Amboseli, Lake Nakuru, Lake Naivasha and Masai Mara',
    description: 'This tour takes you to Amboseli National Park, Lake Nakuru, Lake Naivasha, and Masai Mara, featuring a diverse range of wildlife and breathtaking landscapes.',
    itinerary: [
      {
        day: 1,
        activities: 'Nairobi - Amboseli: Arrive at JKIA, depart for AA Lodge in Amboseli National Reserve, lunch, afternoon game drive. Accommodation: AA Lodge.',
      },
      {
        day: 2,
        activities: 'Full Day Amboseli: Morning and late afternoon game drives. Accommodation: AA Lodge.',
      },
      {
        day: 3,
        activities: 'Amboseli - Lake Nakuru: Morning game drive, depart for Lake Nakuru National Park, lunch at Ziwa Bush Lodge, afternoon game drive.',
      },
      {
        day: 4,
        activities: 'Lake Nakuru - Lake Naivasha: Morning drive in the park, depart for Lake Naivasha, lunch at Sweet Lake Resort.',
      },
      {
        day: 5,
        activities: 'Lake Naivasha - Masai Mara: Boat ride on Lake Naivasha, depart for Masai Mara, lunch at AA Lodge Mara, late afternoon game drive.',
      },
      {
        day: 6,
        activities: 'Full Day Masai Mara: Full day game drive, picnic lunch at Mara River. Accommodation: Lodge/Camp.',
      },
      {
        day: 7,
        activities: 'Masai Mara - Nairobi: Early morning game drive, return to Nairobi.',
      },
    ],
    packageIncludes: [
      'Park fees (For non-residents)',
      'All activities (Unless labeled as optional)',
      'A professional driver/guide',
      'All transportation (Unless labeled as optional)',
      'All Taxes/VAT',
      'Meals (As specified in the day-by-day section)',
      'Drinking water (On all days)',
    ],
    packageExcludes: [
      'International flights (From/to home)',
      'Roundtrip airport transfer',
      'Additional accommodation before and at the end of the tour',
      'Tips (Tipping guideline US$10.00 pp per day)',
      'Personal items (Souvenirs, travel insurance, visa fees, etc.)',
      'Government imposed increase of taxes and/or park fees',
    ],
    highlights: [
      'Amboseli’s elephants and views of Mount Kilimanjaro',
      'Flamingos at Lake Nakuru',
      'Boat ride on Lake Naivasha',
      'Game drives in Masai Mara',
    ],
    location: 'Kenya',
    duration: '7 days',
    price: '$1500 per person',
  },
  {
    id: 4,
    image: elephants,
    title: 'Masai Mara, Lake Nakuru & Amboseli',
    description: '6 Nights 7 Days Safari to Masai Mara, Lake Nakuru & Amboseli. Enjoy this great safari package featuring the best national parks in Kenya.',
    itinerary: [
      {
        day: 1,
        activities: 'Arrive Nairobi - Masai Mara: Meet at the airport, depart for Maasai Mara, lunch at Lenchada Budget Camp, afternoon game drive. Accommodation: Lenchada Budget Camp.',
      },
      {
        day: 2,
        activities: 'Full Day Masai Mara: Full day game drive, picnic lunch at Mara River. Accommodation: Lenchada Budget Camp.',
      },
      {
        day: 3,
        activities: 'Masai Mara - Lake Nakuru: Morning breakfast, depart for Lake Nakuru National Park, lunch at Ziwa Bush Lodge, afternoon game drive.',
      },
      {
        day: 4,
        activities: 'Lake Nakuru - Amboseli: Morning game drive, depart for Amboseli National Park, lunch at AA Lodge, afternoon game drive.',
      },
      {
        day: 5,
        activities: 'Full Day Amboseli: Morning and afternoon game drives. Accommodation: Zebra Plains Camp Amboseli.',
      },
      {
        day: 6,
        activities: 'Amboseli to Nairobi: Morning game drive, return to Nairobi.',
      },
      {
        day: 7,
        activities: 'Full Day North Coast: Breakfast, check out, drop off at the airport.',
      },
    ],
    packageIncludes: [
      'Park fees (For non-residents)',
      'All activities (Unless labeled as optional)',
      'A professional driver/guide',
      'All transportation (Unless labeled as optional)',
      'All Taxes/VAT',
      'Meals (As specified in the day-by-day section)',
      'Drinking water (On all days)',
    ],
    packageExcludes: [
      'International flights (From/to home)',
      'Roundtrip airport transfer',
      'Additional accommodation before and at the end of the tour',
      'Tips (Tipping guideline US$10.00 pp per day)',
      'Personal items (Souvenirs, travel insurance, visa fees, etc.)',
      'Government imposed increase of taxes and/or park fees',
    ],
    highlights: [
      'Masai Mara’s big cats and Great Migration',
      'Flamingos at Lake Nakuru',
      'Amboseli’s elephants and views of Mount Kilimanjaro',
    ],
    location: 'Kenya',
    duration: '7 days',
    price: '$1450 per person',
  },
];


export { urls, trips };
