import { allSports, allCities } from './citysAndSports';

export const env = {
  REACT_APP_URL: 'http://localhost:5000',
  sport: allSports,
  city: allCities,
  orderBy: ['По рейтингу', 'По дате', 'По комментариям', 'По цене'],
  sorttype: ['По возростанию', 'По убыванию'],
};
