import { createStore, combineReducers } from 'redux';
import expensesReducer from './../reducers/expenses.js';
import filtersReducer from './../reducers/filter.js';

export default () => {
  const store = createStore(
      combineReducers({
          expenses:expensesReducer,
          filters:filtersReducer
  })
);
  return store;
};
