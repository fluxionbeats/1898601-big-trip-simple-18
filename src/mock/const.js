const Mock = {
  PICTURE_URL: 'http://picsum.photos/248/152?r=',
  DESCRIPTION_SENTENCES: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.'],
};

const Event = {
  EVENT_TYPES: ['taxi', 'bus', 'train', 'ship',
    'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'],
  EVENT_COUNT: 10,
  MAX_PRICE: 500,
  MIN_PRICE: 1,
  DATE_FROM: {
    MIN: -5,
    MAX: 1,
  },
  DATE_TO: {
    MIN: -3,
    MAX: 8,
  }
};

const Offer = {
  OFFERS_BY_TYPE: [
    {
      'type': 'taxi',
      'offers': [
        {
          'id': 1,
          'title': 'Upgrade to a business class',
          'price': 120
        },
        {
          'id': 2,
          'title': 'Upgrade to a children class',
          'price': 70
        },
      ],
    },
    {
      'type': 'flight',
      'offers': [
        {
          'id': 1,
          'title': 'Upgrade to a business class',
          'price': 300
        },
        {
          'id': 2,
          'title': 'Select a certain place',
          'price': 80
        },
      ],
    },
    {
      'type': 'check-in',
      'offers': [
        {
          'id': 1,
          'title': 'Extra dinner',
          'price': 130
        },
        {
          'id': 2,
          'title': 'Late check-out',
          'price': 80
        },
      ],
    },
    {
      'type': 'bus',
      'offers': [
        {
          'id': 1,
          'title': 'Round trip ticket',
          'price': 20,
        },
      ],
    },
    {
      'type': 'train',
      'offers': [
        {
          'id': 1,
          'title': 'Upgrade to a first class',
          'price': 60,
        },
        {
          'id': 2,
          'title': 'Road trip ticket',
          'price': 40,
        },
        {
          'id': 3,
          'title': 'Include a meal',
          'price': 80,
        },
        {
          'id': 4,
          'title': 'Oversized luggage',
          'price': 30,
        },
      ],
    },
    {
      'type': 'ship',
      'offers': [
        {
          'id': 1,
          'title': 'Upgrade to a first class',
          'price': 410,
        },
      ],
    },
    {
      'type': 'drive',
      'offers': [],
    },
    {
      'type': 'sightseeing',
      'offers': [],
    },
    {
      'type': 'restaurant',
      'offers': [
        {
          'id': 1,
          'title': 'Tips',
          'price': 10
        },
      ],
    },
  ],
};

const Destination = {
  NAMES: ['Beijing', 'London', 'Mexico', 'Moscow', 'Nairobi', 'New Delhi', 'Paris'],
  DESCRIPTIONS:
    [
      'Beijing, the capital of China, is a city where the ancient culture and the modern civilization are well integrated.',
      'London is the capital city of the United Kingdom.',
      'Mexico is among the 15 largest economies in the world and the second largest economy in Latin America.',
      `Moscow is situated on the Moskva River in the Central Federal District
    of European Russia making it the world's most populated inland city.`,
      'Nairobi is situated at in South-Central Kenya, 140 Kilometers ( 87 miles) south of the Equator.',
      'New Delhi, national capital of India.',
      'Paris is one of the most beautiful cities in the world.',
    ],
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

export { Mock, Event, Offer, Destination, FilterType };
