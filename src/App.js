// rccp
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from "./routes/routes.js";
import Welcome from "./components/Welcome";
import Authentication from "./components/Authentication";
import RecentMemos from "./components/RecentMemos";
import NavBar from "./components/NavBar";
import AuthenticationHolder from "./components/AuthenticationHolder";
import Registration from "./components/Registration";
import RegistrationCheckEmail from "./components/RegistrationCheckEmail";
import NotFound from "./components/NotFound";
import MemoDetails from "./components/MemoDetails";
import Chat from "./components/Chat";

class App extends Component {

    // JSX -> React.createElement({ ? : })
    // array.map(o => <div></div>)
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <BrowserRouter>
                            <AuthenticationHolder>
                                <NavBar />
                                <Switch>
                                    <Route exact={true} path={routes.root} component={Welcome} />
                                    <Route exact={true} path={routes.authentication} component={Authentication} />
                                    <Route exact={true} path={routes.registration} component={Registration} />
                                    <Route exact={true} path={routes.registrationCheckEmail} component={RegistrationCheckEmail} />
                                    <Route exact={true} path={routes.chat} component={Chat} />
                                    <Route exact={true} path={routes.recentMemos} component={RecentMemos} />
                                    <Route exact={true} path={routes.memoDetails} component={MemoDetails} />
                                    <Route component={NotFound}/>
                                </Switch>
                            </AuthenticationHolder>
                        </BrowserRouter>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {};

export default App;
