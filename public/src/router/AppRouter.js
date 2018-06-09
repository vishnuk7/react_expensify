import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import ExpenseDashboradPage from './../components/ExpenseDashboradPage';
import AddexpensePage from './../components/AddexpensePage';
import HelpPage from './../components/HelpPage';
import Header from './../components/Header';
import NotFoundPage from './../components/NotfoundPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={ExpenseDashboradPage} exact={true} />
                <Route path="/create" component={AddexpensePage} />
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage} />>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;