import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem form './ExpenseListItem';
import 

const ExpenseList = (props)=>(
    <div>
        <h2>Expense List</h2>
    </div>
);

const mapStateToProps = (state)=>(
    {
        expenses:state.expenses,
        filters:state.filters
    }
);

export default connect(mapStateToProps)(ExpenseList);