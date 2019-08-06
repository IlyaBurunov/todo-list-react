import React from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "./Auth";
import Todos from "./Todos";
import Todo from "./Todo";

function RouterService({location}) {
    console.log(location);
    return (
        <div>
            <Switch location={location}>
                <Route exact path="/" component={Auth}/>
                <Route path="/todos" component={Todos}/>
                <Route path="/todo/:id" component={Todo}/>
            </Switch>
        </div>
    )
}

export default RouterService;
