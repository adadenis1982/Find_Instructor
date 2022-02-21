import { combineReducers } from 'redux';
import { checkSessionReducer } from './checkSessionReducer';
import { searchAdvertsReducer } from './searchAdvertsReducer';
import { advertReducer } from './advertReducer';
import { personReducer } from './personReducer';
import { mapReducer } from './mapReducer';
import { bookingReducer } from './bookingReducer';
import { huyusser } from './huyusser';
import { chatClient } from './chatClient';

export const rootReducer = combineReducers({
  checkSessionReducer,
  searchAdvertsReducer,
  bookingReducer,
  advertReducer,
  personReducer,
  mapReducer,
  huyusser,
  chatClient,
});
