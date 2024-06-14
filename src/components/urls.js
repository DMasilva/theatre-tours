import truck from '../images/truck.jpg';
import homepages from '../images/homepage.jpg';

const urls = [
  { url: truck, name: 'Truck' },
  { url: homepages, name: 'Homepage' },
  { url: truck, name: 'Truck' },
  { url: homepages, name: 'Homepage' },
  { url: truck, name: 'Truck' },

];

const trips = [
  {
    image: truck,
    title: 'Trip in Indonesia',
    description: 'Indonesia, officially the Republic of Indonesia, is a country in Southeast Asia and Oceania between the Indian and Pacific oceans. It consists of over 17,000 islands, including Sumatra, Java, Sulawesi, and parts of Borneo and New Guinea.',
  },
  {
    image: homepages,
    title: 'Trip in Malaysia',
    description: 'Malaysia is a Southeast Asian country occupying parts of the Malay Peninsula and the island of Borneo. It\'s known for its beaches, rainforests and mix of Malay, Chinese, Indian and European cultural influences.',
  },
  {
    image: truck,
    title: 'Trip in France',
    description: 'France, in Western Europe, encompasses medieval cities, alpine villages and Mediterranean beaches. Paris, its capital, is famed for its fashion houses, classical art museums including the Louvre and monuments like the Eiffel Tower.',
  },
  {
    image: homepages,
    title: 'Trip in Malaysia',
    description: 'Malaysia is a Southeast Asian country occupying parts of the Malay Peninsula and the island of Borneo. It\'s known for its beaches, rainforests and mix of Malay, Chinese, Indian and European cultural influences.',
  }
];

export { urls, trips };
