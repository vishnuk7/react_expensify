import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense =(
    {
        description='',
        note='',
        amount=0,
        createdAt=0
    } = {}
    ) =>({
        type:'ADD_EXPENSE',
        expenses:{
            id:uuid(),
            description,
            note,
            amount,
            createdAt
        }
    });

  const removeExpense = ({id} = {}) =>({
    type:'REMOVE_EXPENSE',
    id
  });

  const editExpense = (id,updates) =>({
    type:'EDIT_EXPENSE',
    id,
    updates
  });

const setTextFilter = (text = '')=>({
  type:'SET_TEXT_FILTER',
  text
});

const sortByDate = () =>({
  type:'SORT_BY_DATE'
});

const sortByAmount = () =>({
  type:'SORT_BY_AMOUNT'
});

const setStartDate = (startDate) =>({
    type:'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) => ({
  type:'SET_END_DATE',
  endDate
});

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState,action) =>{
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expenses
            ];
        case 'REMOVE_EXPENSE':
          return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
          return state.map((expense) =>{
            if(expense.id === action.id){
              return {
                ...expense,
                ...action.updates
              }
            }else{
              return expense;
            }
          })
        default:
         return state;
    }
};

const filterReducerDefaultState = {
    text:'',
    sortBy: 'date',
    startDate:undefined,
    endDate:undefined
}

const filtersReducer = (state = filterReducerDefaultState,action)=>{
    switch(action.type){
      case 'SET_TEXT_FILTER':
          return{
            ...state,
            text:action.text
          };
      case 'SORT_BY_AMOUNT':
        return{
          ...state,
          sortBy:'amount'
        };
      case 'SORT_BY_DATE':
        return {
          ...state,
          sortBy:'date'
        };
      case 'SET_START_DATE':
        return{
          ...state,
          startDate:action.startDate
        };
      case 'SET_END_DATE':
        return{
          ...state,
          endDate:action.endDate
        };
        default:
         return state;
    }
}

const getVisibleExpenses = (expenses,{text,sortBy,startDate,endDate}) =>{
  return expenses.filter((expense)=>{
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
     const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
     const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

     return startDateMatch && endDateMatch && textMatch;
   }).sort((a, b) => {
     if (sortBy === 'date') {
       return a.createdAt < b.createdAt ? 1 : -1;
     } else if (sortBy === 'amount') {
       return a.amount < b.amount ? 1 : -1;
     }
   });
};

const store = createStore(
    combineReducers({
        expenses:expensesReducer,
        filters:filtersReducer
})
);

store.subscribe(()=>{
    console.log(store.getState());
});

const one = store.dispatch(addExpense({description:'Rent',amount:100,createdAt:10000}));
const two = store.dispatch(addExpense({description:'Tea',note:'mothly tea',amount:70,createdAt:50000}));

// store.dispatch(removeExpense({id:one.expenses.id}));
store.dispatch(editExpense(two.expenses.id,{description:'Drinks',amount:200}));

store.dispatch(setTextFilter('Hello'));
store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

store.dispatch(setStartDate(70000));
store.dispatch(setEndDate(1000000));

const demoState = {
expenses:[{
    id:'poijasdfhwer',
    description:'January Rent',
    note:'This was the final payment for that address',
    amount:54500,
    createdAt:0
}],
filters:{
    text:'rent',
    sortBy:'amount',
    startDate:undefined,
    endDate:undefined
}
};
