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
    description: 'Discover the wild beauty of Tsavo East National Park on a one-day safari from Diani. Covering 345 km, this adventure takes you through diverse landscapes to witness the parks iconic wildlife. You will spot elephants, lions, and buffalos roaming amidst the vast savannah and marvel at the striking Lugard Falls and Aruba Dam. With a professional guide, this unforgettable journey offers a thrilling glimpse into Kenyas pristine wilderness.',
    itinerary: [
      {
        day: 1,
        activities: 'Diani Beach to Tsavo East National Park (240km, 4 hours). Pick up from your beach hotel at 5:30am and depart for Tsavo East National Park. Upon entering the park, the driver will open the roof of your bus so you can stand up and feel the wind in your hair. Welcome to Africa! The safari has begun! Tsavo is Kenyas largest national park and is split east and west by a highway. Arrive and enjoy a game drive en route to the lodge. Check in at Voi Safari Lodge in time for lunch, relax, and later head back into the park for your afternoon game drive. Return to the lodge as the sun sets.',
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
      'Amboselis elephants and views of Mount Kilimanjaro',
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
      'Masai Maras big cats and Great Migration',
      'Flamingos at Lake Nakuru',
      'Amboselis elephants and views of Mount Kilimanjaro',
    ],
    location: 'Kenya',
    duration: '7 days',
    price: '$1450 per person',
  },
  {
    id: 5,
    image: flamingo,
    title: '4-Day Lake Nakuru and Masai Mara Safari',
    description: 'Experience the best of Kenyas wildlife with this 4-day safari combining Lake Nakuru National Park and the world-famous Masai Mara. Witness the spectacular flamingo flocks at Lake Nakuru and search for the Big Five in the Masai Maras rolling grasslands.',
    itinerary: [
      {
        day: 1,
        activities: 'Nairobi to Lake Nakuru: Morning departure from Nairobi, scenic drive through the Great Rift Valley, afternoon game drive at Lake Nakuru National Park. Accommodation: Lake Nakuru Lodge.',
      },
      {
        day: 2,
        activities: 'Lake Nakuru to Masai Mara: Morning game drive at Lake Nakuru, transfer to Masai Mara, evening game drive. Accommodation: Mara Sopa Lodge.',
      },
      {
        day: 3,
        activities: 'Full Day Masai Mara: Full day of game drives in the Masai Mara, visit to a Maasai village. Accommodation: Mara Sopa Lodge.',
      },
      {
        day: 4,
        activities: 'Masai Mara to Nairobi: Early morning game drive, breakfast, return to Nairobi arriving in the late afternoon.',
      },
    ],
    packageIncludes: [
      'Park entrance fees',
      'Professional safari guide',
      'Transport in a 4x4 safari vehicle',
      'All meals as specified',
      'Bottled water',
      'Accommodation as listed',
      'Game drives as mentioned',
    ],
    packageExcludes: [
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Personal expenses',
      'Tips and gratuities',
      'Optional activities',
    ],
    highlights: [
      'Flamingo viewing at Lake Nakuru',
      'Big Five game viewing in Masai Mara',
      'Visit to a traditional Maasai village',
      'Professional wildlife photography opportunities',
    ],
    location: 'Lake Nakuru & Masai Mara, Kenya',
    duration: '4 days',
    price: '$850 per person',
  },
  {
    id: 6,
    image: hotair,
    title: 'Luxury Masai Mara Hot Air Balloon Safari',
    description: 'Soar above the Masai Mara in a hot air balloon for an unforgettable sunrise experience. This premium package includes luxury accommodation, gourmet meals, and exclusive game drives to witness the incredible wildlife of the Mara.',
    itinerary: [
      {
        day: 1,
        activities: 'Nairobi to Masai Mara: VIP transfer from Nairobi to the Masai Mara, welcome dinner at luxury tented camp. Accommodation: Governors Camp.'
      },
      {
        day: 2,
        activities: 'Hot Air Balloon Safari: Pre-dawn wake-up, hot air balloon flight at sunrise, champagne breakfast in the bush, afternoon game drive. Accommodation: Governors Camp.',
      },
      {
        day: 3,
        activities: 'Full Day Masai Mara: Full day game drive with gourmet picnic lunch, evening sundowners. Accommodation: Governors Camp.',
      },
      {
        day: 4,
        activities: 'Masai Mara to Nairobi: Morning game drive, brunch, flight back to Nairobi.',
      },
    ],
    packageIncludes: [
      'Hot air balloon safari with champagne breakfast',
      'Luxury tented accommodation',
      'All gourmet meals and selected drinks',
      'Private game drives in custom 4x4 vehicles',
      'Professional guide and photographer',
      'Flight from Masai Mara to Nairobi',
      'Conservation fees',
    ],
    packageExcludes: [
      'International flights',
      'Premium alcoholic beverages',
      'Spa treatments',
      'Travel insurance',
      'Personal shopping',
    ],
    highlights: [
      'Sunrise hot air balloon safari',
      'Champagne breakfast in the bush',
      'Luxury tented accommodation',
      'Exclusive game viewing experiences',
    ],
    location: 'Masai Mara, Kenya',
    duration: '4 days',
    price: '$3200 per person',
  },
  {
    id: 7,
    image: lions,
    title: '10-Day Ultimate Kenya Wildlife Safari',
    description: 'The ultimate Kenya safari experience covering five premier wildlife destinations: Amboseli, Tsavo, Lake Nakuru, Lake Naivasha, and Masai Mara. Perfect for wildlife enthusiasts seeking the complete Kenyan safari experience.',
    itinerary: [
      {
        day: 1,
        activities: 'Nairobi arrival: Airport pickup, overnight in Nairobi. Accommodation: Tamarind Tree Hotel.',
      },
      {
        day: 2,
        activities: 'Nairobi to Amboseli: Transfer to Amboseli National Park, afternoon game drive with views of Mt. Kilimanjaro. Accommodation: Amboseli Serena Safari Lodge.',
      },
      {
        day: 3,
        activities: 'Full day Amboseli: Morning and afternoon game drives, visit to a Maasai village. Accommodation: Amboseli Serena Safari Lodge.',
      },
      {
        day: 4,
        activities: 'Amboseli to Tsavo East: Transfer to Tsavo East National Park, afternoon game drive. Accommodation: Ashnil Aruba Lodge.',
      },
      {
        day: 5,
        activities: 'Tsavo East to Tsavo West: Morning game drive in Tsavo East, transfer to Tsavo West, visit Mzima Springs. Accommodation: Kilaguni Serena Safari Lodge.',
      },
      {
        day: 6,
        activities: 'Tsavo West to Lake Nakuru: Long drive to Lake Nakuru National Park, evening relaxation. Accommodation: Lake Nakuru Sopa Lodge.',
      },
      {
        day: 7,
        activities: 'Lake Nakuru to Lake Naivasha: Morning game drive at Lake Nakuru, transfer to Lake Naivasha, afternoon boat ride. Accommodation: Lake Naivasha Sopa Resort.',
      },
      {
        day: 8,
        activities: 'Lake Naivasha to Masai Mara: Transfer to Masai Mara, afternoon game drive. Accommodation: Mara Serena Safari Lodge.',
      },
      {
        day: 9,
        activities: 'Full day Masai Mara: Full day of game drives in the Masai Mara, optional visit to Mara River. Accommodation: Mara Serena Safari Lodge.',
      },
      {
        day: 10,
        activities: 'Masai Mara to Nairobi: Final morning game drive, return to Nairobi, farewell dinner.',
      },
    ],
    packageIncludes: [
      'All park entrance fees',
      'Professional safari guide',
      'All accommodation as listed',
      'All meals during safari',
      'Transportation in a 4x4 safari vehicle',
      'Airport transfers',
      'Bottled water during game drives',
    ],
    packageExcludes: [
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Optional activities',
      'Alcoholic beverages',
      'Tips and gratuities',
    ],
    highlights: [
      'Views of Mt. Kilimanjaro from Amboseli',
      'Red elephants of Tsavo',
      'Flamingos at Lake Nakuru',
      'Boat safari on Lake Naivasha',
      'Big Five in Masai Mara',
    ],
    location: 'Multiple Parks, Kenya',
    duration: '10 days',
    price: '$2950 per person',
  },
  {
    id: 8,
    image: elephant,
    title: '3-Day Amboseli National Park Safari',
    description: 'Experience the magic of Amboseli National Park with its large elephant herds and stunning views of Mount Kilimanjaro. This short safari is perfect for those with limited time who still want to experience authentic Kenyan wildlife.',
    itinerary: [
      {
        day: 1,
        activities: 'Nairobi to Amboseli: Morning departure from Nairobi, scenic drive to Amboseli National Park, afternoon game drive. Accommodation: Kibo Safari Camp.',
      },
      {
        day: 2,
        activities: 'Full Day Amboseli: Early morning game drive when Mount Kilimanjaro is most visible, afternoon game drive focusing on elephant herds. Accommodation: Kibo Safari Camp.',
      },
      {
        day: 3,
        activities: 'Amboseli to Nairobi: Final morning game drive, breakfast, return to Nairobi arriving in the afternoon.',
      },
    ],
    packageIncludes: [
      'Park entrance fees',
      'Professional safari guide',
      'All meals as specified',
      'Accommodation in comfortable tented camp',
      'Transportation in a safari minivan',
      'Bottled water during game drives',
    ],
    packageExcludes: [
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Personal expenses',
      'Tips and gratuities',
      'Optional activities',
    ],
    highlights: [
      'Mount Kilimanjaro views',
      'Large elephant herds',
      'Diverse bird species',
      'Authentic safari experience',
    ],
    location: 'Amboseli National Park, Kenya',
    duration: '3 days',
    price: '$650 per person',
  },
  {
    id: 9,
    image: girrafes,
    title: '5-Day Ol Pejeta Conservancy and Mount Kenya Safari',
    description: 'Combine wildlife conservation and mountain scenery with this unique safari to Ol Pejeta Conservancy and Mount Kenya region. Visit the last northern white rhinos on earth and enjoy the beautiful landscapes of central Kenya.',
    itinerary: [
      {
        day: 1,
        activities: 'Nairobi to Ol Pejeta: Morning departure from Nairobi, drive to Ol Pejeta Conservancy, afternoon visit to the rhino sanctuary. Accommodation: Sweetwaters Tented Camp.',
      },
      {
        day: 2,
        activities: 'Full Day Ol Pejeta: Morning and afternoon game drives, visit to the chimpanzee sanctuary. Accommodation: Sweetwaters Tented Camp.',
      },
      {
        day: 3,
        activities: 'Ol Pejeta to Mount Kenya: Morning game drive, transfer to Mount Kenya region, afternoon nature walk. Accommodation: Serena Mountain Lodge.',
      },
      {
        day: 4,
        activities: 'Mount Kenya: Full day exploring Mount Kenya region, optional activities including mountain biking or fishing. Accommodation: Serena Mountain Lodge.',
      },
      {
        day: 5,
        activities: 'Mount Kenya to Nairobi: Morning nature walk, breakfast, return to Nairobi arriving in the afternoon.',
      },
    ],
    packageIncludes: [
      'Conservation and park fees',
      'Professional guide',
      'All meals as specified',
      'Accommodation as listed',
      'Transportation in a 4x4 safari vehicle',
      'Bottled water',
      'All activities mentioned',
    ],
    packageExcludes: [
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Optional activities not mentioned',
      'Alcoholic beverages',
      'Tips and gratuities',
    ],
    highlights: [
      'Northern white rhino sanctuary',
      'Chimpanzee sanctuary',
      'Mount Kenya landscapes',
      'Wildlife conservation experience',
    ],
    location: 'Ol Pejeta & Mount Kenya, Kenya',
    duration: '5 days',
    price: '$1200 per person',
  },
  {
    id: 10,
    image: zebra,
    title: '8-Day Kenya and Tanzania Cross-Border Safari',
    description: 'Experience the best of East Africa with this cross-border safari covering the top wildlife destinations in both Kenya and Tanzania. From the Masai Mara to the Serengeti and Ngorongoro Crater, witness the incredible diversity of landscapes and wildlife.',
    itinerary: [
      {
        day: 1,
        activities: 'Nairobi arrival: Airport pickup, overnight in Nairobi. Accommodation: Eka Hotel.',
      },
      {
        day: 2,
        activities: 'Nairobi to Masai Mara: Morning departure to Masai Mara, afternoon game drive. Accommodation: Mara Sopa Lodge.',
      },
      {
        day: 3,
        activities: 'Full Day Masai Mara: Full day of game drives in the Masai Mara. Accommodation: Mara Sopa Lodge.',
      },
      {
        day: 4,
        activities: 'Masai Mara to Serengeti: Cross the border into Tanzania, afternoon game drive in Serengeti. Accommodation: Serengeti Sopa Lodge.',
      },
      {
        day: 5,
        activities: 'Full Day Serengeti: Full day exploring the vast Serengeti plains. Accommodation: Serengeti Sopa Lodge.',
      },
      {
        day: 6,
        activities: 'Serengeti to Ngorongoro: Morning game drive in Serengeti, transfer to Ngorongoro Conservation Area. Accommodation: Ngorongoro Sopa Lodge.',
      },
      {
        day: 7,
        activities: 'Ngorongoro Crater: Full day exploring Ngorongoro Crater. Accommodation: Ngorongoro Sopa Lodge.',
      },
      {
        day: 8,
        activities: 'Ngorongoro to Arusha: Morning at leisure, transfer to Arusha for departure.',
      },
    ],
    packageIncludes: [
      'All park and conservation fees',
      'Professional safari guides in both countries',
      'All accommodation as listed',
      'All meals during safari',
      'Transportation in 4x4 safari vehicles',
      'Border crossing assistance',
      'Airport transfers',
    ],
    packageExcludes: [
      'International flights',
      'Visa fees for Kenya and Tanzania',
      'Travel insurance',
      'Optional activities',
      'Alcoholic beverages',
      'Tips and gratuities',
    ],
    highlights: [
      'Big Five in Masai Mara',
      'Serengetis endless plains',
      'Ngorongoro Craters wildlife concentration',
      'Cross-border safari experience',
    ],
    location: 'Kenya & Tanzania',
    duration: '8 days',
    price: '$3500 per person',
  },
  {
    id: 11,
    image: flamingo,
    title: '6-Day Rift Valley Lakes Safari',
    description: 'Explore Kenyas Great Rift Valley and its stunning lakes on this specialized safari. Visit Lakes Naivasha, Elementaita, Nakuru, and Baringo to witness diverse birdlife, wildlife, and breathtaking landscapes.',
    itinerary: [
      {
        day: 1,
        activities: 'Nairobi to Lake Naivasha: Morning departure from Nairobi, afternoon boat ride on Lake Naivasha. Accommodation: Lake Naivasha Sopa Resort.',
      },
      {
        day: 2,
        activities: 'Lake Naivasha: Morning visit to Crescent Island for walking safari, afternoon visit to Hells Gate National Park. Accommodation: Lake Naivasha Sopa Resort.',
      },
      {
        day: 3,
        activities: 'Lake Naivasha to Lake Elementaita: Transfer to Lake Elementaita, birdwatching and hot springs visit. Accommodation: Lake Elementaita Serena Camp.',
      },
      {
        day: 4,
        activities: 'Lake Elementaita to Lake Nakuru: Morning at leisure, transfer to Lake Nakuru National Park, afternoon game drive. Accommodation: Lake Nakuru Lodge.',
      },
      {
        day: 5,
        activities: 'Lake Nakuru to Lake Baringo: Morning game drive at Lake Nakuru, transfer to Lake Baringo, evening boat ride. Accommodation: Lake Baringo Club.',
      },
      {
        day: 6,
        activities: 'Lake Baringo to Nairobi: Morning birdwatching, return to Nairobi arriving in the late afternoon.',
      },
    ],
    packageIncludes: [
      'All park and conservation fees',
      'Professional guide specialized in birds',
      'All boat rides mentioned',
      'All meals as specified',
      'Accommodation as listed',
      'Transportation in a safari vehicle',
      'Bottled water',
    ],
    packageExcludes: [
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Optional activities not mentioned',
      'Alcoholic beverages',
      'Tips and gratuities',
    ],
    highlights: [
      'Boat safaris on multiple lakes',
      'Walking safari on Crescent Island',
      'Flamingos at Lake Nakuru',
      'Over 450 bird species throughout the trip',
    ],
    location: 'Rift Valley, Kenya',
    duration: '6 days',
    price: '$1350 per person',
  },
  {
    id: 12,
    image: lions,
    title: '9-Day Kenya Photography Safari',
    description: 'Designed specifically for photography enthusiasts, this safari visits prime wildlife locations at optimal times for photography. With specially modified vehicles and expert photography guides, capture stunning images of kenyas wildlife and landscapes.',
    itinerary: [
      {
        day: 1,
        activities: 'Nairobi arrival: Airport pickup, photography briefing, overnight in Nairobi. Accommodation: Hemingways Nairobi.',
      },
      {
        day: 2,
        activities: 'Nairobi to Amboseli: Transfer to Amboseli National Park, afternoon photography session with elephants and Mt. Kilimanjaro. Accommodation: Tortilis Camp.',
      },
      {
        day: 3,
        activities: 'Full Day Amboseli: Full day of photography in Amboseli, focusing on elephants and landscapes. Accommodation: Tortilis Camp.',
      },
      {
        day: 4,
        activities: 'Amboseli to Samburu: Morning flight to Samburu National Reserve, afternoon photography session. Accommodation: Elephant Bedroom Camp.',
      },
      {
        day: 5,
        activities: 'Full Day Samburu: Full day photographing Samburus unique wildlife including gerenuk and reticulated giraffe. Accommodation: Elephant Bedroom Camp.',
      },
      {
        day: 6,
        activities: 'Samburu to Masai Mara: Morning flight to Masai Mara, afternoon photography session. Accommodation: Mara Plains Camp.',
      },
      {
        day: 7,
        activities: 'Full Day Masai Mara: Full day of photography in the Masai Mara, focusing on big cats. Accommodation: Mara Plains Camp.',
      },
      {
        day: 8,
        activities: 'Full Day Masai Mara: Another full day in different areas of the Masai Mara. Accommodation: Mara Plains Camp.',
      },
      {
        day: 9,
        activities: 'Masai Mara to Nairobi: Final morning photography session, flight back to Nairobi for departure.',
      },
    ],
    packageIncludes: [
      'All park fees',
      'Professional photography guide',
      'Specially modified photography vehicles',
      'All internal flights',
      'Luxury accommodation as listed',
      'All meals and selected drinks',
      'Photography workshops and editing sessions',
    ],
    packageExcludes: [
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Camera equipment',
      'Premium alcoholic beverages',
      'Tips and gratuities',
    ],
    highlights: [
      'Elephants against Mt. Kilimanjaro backdrop',
      'Samburus unique northern species',
      'Big cats in the Masai Mara',
      'Expert photography guidance',
    ],
    location: 'Multiple Parks, Kenya',
    duration: '9 days',
    price: '$6500 per person',
  },
  {
    id: 13,
    image: elephants,
    title: '14-Day Grand Kenya and Tanzania Safari',
    description: 'The ultimate East African safari experience covering all major wildlife destinations in Kenya and Tanzania. This comprehensive journey takes you through diverse ecosystems from the Masai Mara to the Serengeti, Ngorongoro Crater, and the tropical coast.',
    itinerary: [
      {
        day: 1,
        activities: 'Nairobi arrival: Airport pickup, overnight in Nairobi. Accommodation: Fairmont The Norfolk.',
      },
      {
        day: 2,
        activities: 'Nairobi to Amboseli: Transfer to Amboseli National Park, afternoon game drive. Accommodation: Amboseli Serena Safari Lodge.',
      },
      {
        day: 3,
        activities: 'Full Day Amboseli: Full day exploring Amboseli National Park. Accommodation: Amboseli Serena Safari Lodge.',
      },
      {
        day: 4,
        activities: 'Amboseli to Arusha: Cross the border into Tanzania, overnight in Arusha. Accommodation: Arusha Coffee Lodge.',
      },
      {
        day: 5,
        activities: 'Arusha to Tarangire: Transfer to Tarangire National Park, afternoon game drive. Accommodation: Tarangire Sopa Lodge.',
      },
      {
        day: 6,
        activities: 'Tarangire to Lake Manyara: Morning game drive in Tarangire, transfer to Lake Manyara, afternoon game drive. Accommodation: Lake Manyara Serena Lodge.',
      },
      {
        day: 7,
        activities: 'Lake Manyara to Ngorongoro: Morning game drive at Lake Manyara, transfer to Ngorongoro Conservation Area. Accommodation: Ngorongoro Serena Lodge.',
      },
      {
        day: 8,
        activities: 'Full Day Ngorongoro Crater: Full day exploring Ngorongoro Crater. Accommodation: Ngorongoro Serena Lodge.',
      },
      {
        day: 9,
        activities: 'Ngorongoro to Serengeti: Transfer to Serengeti National Park, afternoon game drive. Accommodation: Serengeti Serena Lodge.',
      },
      {
        day: 10,
        activities: 'Full Day Serengeti: Full day exploring Serengeti National Park. Accommodation: Serengeti Serena Lodge.',
      },
      {
        day: 11,
        activities: 'Serengeti to Masai Mara: Cross back into Kenya, transfer to Masai Mara. Accommodation: Mara Serena Safari Lodge.',
      },
      {
        day: 12,
        activities: 'Full Day Masai Mara: Full day exploring Masai Mara National Reserve. Accommodation: Mara Serena Safari Lodge.',
      },
      {
        day: 13,
        activities: 'Masai Mara to Diani Beach: Flight to Diani Beach on Kenyas coast. Accommodation: Almanara Luxury Resort.',
      },
      {
        day: 14,
        activities: 'Diani Beach to Nairobi: Morning at leisure on the beach, afternoon flight to Nairobi for departure.',
      },
    ],
    packageIncludes: [
      'All park and conservation fees',
      'Professional safari guides in both countries',
      'All accommodation as listed',
      'All meals during safari',
      'Internal flights as mentioned',
      'Transportation in 4x4 safari vehicles',
      'Border crossing assistance',
    ],
    packageExcludes: [
      'International flights',
      'Visa fees for Kenya and Tanzania',
      'Travel insurance',
      'Optional activities',
      'Alcoholic beverages',
      'Tips and gratuities',
    ],
    highlights: [
      'All major East African wildlife destinations',
      'The Great Migration (seasonal)',
      'Ngorongoro Craters wildlife concentration',
      'Relaxation on Kenyas tropical coast',
    ],
    location: 'Kenya & Tanzania',
    duration: '14 days',
    price: '$7200 per person',
  },
  {
    id: 14,
    image: hotair,
    title: '5-Day Masai Mara and Lake Victoria Safari',
    description: 'Combine the world-famous Masai Mara with the tranquil shores of Lake Victoria on this unique safari. Experience exceptional wildlife viewing and authentic cultural interactions with local fishing communities.',
    itinerary: [
      {
        day: 1,
        activities: 'Nairobi to Masai Mara: Morning flight from Nairobi to Masai Mara, afternoon game drive. Accommodation: Mara Intrepids Camp.',
      },
      {
        day: 2,
        activities: 'Full Day Masai Mara: Full day of game drives in the Masai Mara, optional hot air balloon safari. Accommodation: Mara Intrepids Camp.',
      },
      {
        day: 3,
        activities: 'Masai Mara to Lake Victoria: Morning game drive, transfer to Lake Victoria, afternoon boat ride. Accommodation: Rusinga Island Lodge.',
      },
      {
        day: 4,
        activities: 'Full Day Lake Victoria: Morning fishing with local fishermen, afternoon visit to local villages and bird watching. Accommodation: Rusinga Island Lodge.',
      },
      {
        day: 5,
        activities: 'Lake Victoria to Nairobi: Morning at leisure, flight back to Nairobi for departure.',
      },
    ],
    packageIncludes: [
      'All park and conservation fees',
      'Professional safari guide',
      'All internal flights',
      'All meals as specified',
      'Accommodation as listed',
      'All activities mentioned',
      'Bottled water',
    ],
    packageExcludes: [
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Optional hot air balloon safari',
      'Alcoholic beverages',
      'Tips and gratuities',
    ],
    highlights: [
      'Big Five in Masai Mara',
      'Fishing with local fishermen',
      'Lake Victoria bird watching',
      'Cultural interactions',
    ],
    location: 'Masai Mara & Lake Victoria, Kenya',
    duration: '5 days',
    price: '$2200 per person',
  },
  {
    id: 15,
    image: girrafes,
    title: '3-Day Nairobi Wildlife Experience',
    description: 'Perfect for travelers with limited time, this safari experience is based in Nairobi and visits nearby wildlife attractions including Nairobi National Park, the Giraffe Centre, and the David Sheldrick Wildlife Trust.',
    itinerary: [
      {
        day: 1,
        activities: 'Nairobi National Park: Early morning game drive in Nairobi National Park, visit to David Sheldrick Wildlife Trust for elephant orphan feeding, afternoon at leisure. Accommodation: Hemingways Nairobi.',
      },
      {
        day: 2,
        activities: 'Giraffe Centre and Karen Blixen: Morning visit to Giraffe Centre, lunch at Karen Blixen Coffee Garden, afternoon visit to Karen Blixen Museum. Accommodation: Hemingways Nairobi.',
      },
      {
        day: 3,
        activities: 'Nairobi: Morning visit to Kazuri Beads factory, afternoon at leisure for shopping or optional activities.',
      },
    ],
    packageIncludes: [
      'All entrance fees',
      'Professional guide',
      'All meals as specified',
      'Luxury accommodation',
      'Transportation in a private vehicle',
      'Airport transfers',
    ],
    packageExcludes: [
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Optional activities',
      'Alcoholic beverages',
      'Tips and gratuities',
    ],
    highlights: [
      'Wildlife viewing in Nairobi National Park',
      'Feeding giraffes at the Giraffe Centre',
      'Elephant orphanage visit',
      'Karen Blixen Museum',
    ],
    location: 'Nairobi, Kenya',
    duration: '3 days',
    price: '$950 per person',
  },
  {
    id: 16,
    image: lion,
    title: '7-Day Northern Kenya Wilderness Safari',
    description: 'Explore the remote and less-visited northern regions of Kenya on this adventure safari. Visit Samburu, Shaba, and Buffalo Springs reserves to see unique wildlife species not found in southern parks.',
    itinerary: [
      {
        day: 1,
        activities: 'Nairobi to Samburu: Morning flight from Nairobi to Samburu, afternoon game drive. Accommodation: Samburu Intrepids Camp.',
      },
      {
        day: 2,
        activities: 'Full Day Samburu: Full day exploring Samburu National Reserve. Accommodation: Samburu Intrepids Camp.',
      },
      {
        day: 3,
        activities: 'Samburu to Shaba: Morning game drive in Samburu, transfer to Shaba National Reserve, afternoon game drive. Accommodation: Sarova Shaba Game Lodge.',
      },
      {
        day: 4,
        activities: 'Full Day Shaba: Full day exploring Shaba National Reserve. Accommodation: Sarova Shaba Game Lodge.',
      },
      {
        day: 5,
        activities: 'Shaba to Buffalo Springs: Morning game drive in Shaba, transfer to Buffalo Springs, afternoon game drive. Accommodation: Ashnil Samburu Camp.',
      },
      {
        day: 6,
        activities: 'Full Day Buffalo Springs: Full day exploring Buffalo Springs National Reserve. Accommodation: Ashnil Samburu Camp.',
      },
      {
        day: 7,
        activities: 'Buffalo Springs to Nairobi: Morning game drive, flight back to Nairobi for departure.',
      },
    ],
    packageIncludes: [
      'All park and conservation fees',
      'Professional safari guide',
      'All internal flights',
      'All meals during safari',
      'Accommodation as listed',
      'Transportation in a 4x4 safari vehicle',
      'Bottled water',
    ],
    packageExcludes: [
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Optional activities',
      'Alcoholic beverages',
      'Tips and gratuities',
    ],
    highlights: [
      'Samburus unique wildlife',
      'Shabas diverse habitats',
      'Buffalo Springs abundant wildlife',
    ],
    location: 'Northern Kenya',
    duration: '7 days',
    price: '$1500 per person'
  }
]


export { urls, trips };
