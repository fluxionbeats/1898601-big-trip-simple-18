import { FilterType } from './const.js';
import dayjs from 'dayjs';


const getEventsByFilter = (events) => ({
  [FilterType.EVERYTHING]: events,
  [FilterType.FUTURE]: events.filter((event) => dayjs(event.dateFrom).isAfter(dayjs())),
});


const generateFilters = (events) => Object.entries(getEventsByFilter(events)).map(
  ([filterName, filterEvents]) => ({
    name: filterName,
    length: filterEvents.length,
  })
);


export { generateFilters };
