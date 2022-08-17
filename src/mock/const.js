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
      'offers': [],
    },
    {
      'type': 'train',
      'offers': [],
    },
    {
      'type': 'ship',
      'offers': [],
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

export { Mock, Event, Offer };
