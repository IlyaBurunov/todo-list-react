import React from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "./Auth";
import Todos from "./Todos";

function RouterService({location}) {
    return (
        <div>
            <Switch location={location}>
                <Route exact path="/" component={Auth}/>
                <Route path="/todos" component={Todos}/>
            </Switch>
        </div>
    )
}

export default RouterService;
