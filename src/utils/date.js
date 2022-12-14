import dayjs from 'dayjs';


const formatToDashedDate = (date) => dayjs(date).format('YYYY-MM-DD');


const formatToShortDate = (date) => dayjs(date).format('MMM D');


const formatToShortISO = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');


const formatToTime = (date) => dayjs(date).format('HH:mm');


const formatToSlashedDate = (date) => dayjs(date).format('DD/MM/YY');


export {
  formatToDashedDate, formatToShortDate, formatToShortISO
  , formatToTime, formatToSlashedDate
};
