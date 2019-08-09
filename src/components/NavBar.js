import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from "react-router-dom";
import routes from "../routes/routes.js";
import AuthenticationContext from '../context/AuthenticationContext';

class NavBar extends Component {

    onSignIn = () => { // чтобы не было проблем
        this.props.history.push(routes.authentication);
    };

    onSignUp = async () => {
        this.props.history.push(routes.registration);
    };

    onLogout = () => {
        this.context.unauthenticate();
    };

    render() {
        const isAuthenticated = this.context.authenticated;

        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light mb-3">
                <Link to={routes.root} className="navbar-brand">Chat</Link>

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={routes.recentMemos} className="nav-link">Recent</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                </form>

                <div>
                    {/* Для упрощения синтаксиса вместо тернарного оператора */}
                    {/* Если первое выражение (до &&) - truthy, то возвращается второе - элемент */}
                    {/* Если первое выражение (до &&) - falsy, то возвращается false (ничего не отрисовывается) */}
                    {
                        isAuthenticated &&
                        <button className="btn btn-outline-danger" onClick={() => this.onLogout()}>Logout</button>
                    }
                    {
                        !isAuthenticated &&
                        <div className="btn-group">
                            <button className="btn btn-outline-success"
                                    onClick={() => this.onSignIn()}>Login
                            </button>
                            <button className="btn btn-outline-success"
                                    onClick={() => this.onSignUp()}>Register
                            </button>
                        </div>
                    }
                </div>
            </nav>
        );

        // if (!this.context.authenticated) {
        //    return (
        //         <nav>
        //            <button onClick={() => this.onSignIn()}>Sign in</button>
        //            <button onClick={() => this.onSignUp()}>Sign Up</button>
        //         </nav>
        //     )
        // }
        //
        // return (
        //     <nav>
        //         <button onClick={() => this.onLogout()}>Logout</button>
        //     </nav>
        // );
    }
}

NavBar.propTypes = {
    history: PropTypes.object.isRequired // говорим, что должно быть history - object и required
};
NavBar.contextType = AuthenticationContext;

export default withRouter(NavBar);
