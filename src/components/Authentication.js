import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../http/client';
import AuthenticationContext from '../context/AuthenticationContext';
import routes from "../routes/routes.js";
import Loader from "./Loader.js";
import { extractError } from "../utils/utils.js";

class Authentication extends Component {
    state = { // хранит данные, введённые в поля ввода + loading
        loading: false,
        formData: {
            username: '',
            password: '',
        },
        error: null,
    };
    componentDidMount() {
        console.log('auth mount');
        if (this.context.authenticated) {
            this.props.history.push(routes.chat);
        }
    }

    onSubmit = async (evt) => {
        evt.preventDefault();

        // destructuring
        const {username, password} = this.state.formData;

        try {
            this.setState({loading: true, error: null});
            const response = await client.post('/authentication', {
                username, // username: username
                password, // password: password
            });
            // console.log(response.data.authenticationToken);
            const {authenticationToken} = response.data; // const token = response.token;
            console.log('token = ',authenticationToken);
            this.setState({error: null, loading: false});

            // setState нужно делать до push
            this.context.authenticate(username, authenticationToken);
            this.props.history.push(routes.slack);
        } catch (e) {
            this.setState({error : extractError(e), loading: false});
        }
    };

    onChange = (evt) => {
        const {name, value} = evt.target;
        const formData = {...this.state.formData, [name]: value};

        // в переданном state только ключ formData, поэтому loading и error не трогаем
        this.setState({formData: formData});
    };

    render() {
        const {username, password} = this.state.formData;

        return (
            <div>
                {
                    this.state.error &&
                    <div className="alert alert-danger">{this.state.error}</div>
                }
                {
                    this.state.loading && <Loader />
                }
                <form onSubmit={(evt) => this.onSubmit(evt)}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            className="form-control"
                            type="email"
                            placeholder="Input your email"
                            value={username}
                            onChange={(evt) => this.onChange(evt)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            className="form-control"
                            type="password"
                            placeholder="Input your password"
                            value={password}
                            onChange={(evt) => this.onChange(evt)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-success" disabled={this.state.loading}>Login</button>
                </form>
            </div>
        );
    }
}

Authentication.propTypes = {
    history: PropTypes.object.isRequired
};
Authentication.contextType = AuthenticationContext;

export default Authentication;
