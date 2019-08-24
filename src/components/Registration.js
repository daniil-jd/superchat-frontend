import React, {Component} from 'react';
import client from "../http/client";
import routes from "../routes/routes";
import {extractError} from "../utils/utils";
import Loader from "./Loader";

class Registration extends Component {
    state = {
        loading: false,
        formData: {
            username: '',
            password: '',
            confirmPassword: '',
        },
        error: null,
    };
    componentDidMount() {
        if (this.context.authenticated) {
            this.props.history.push(routes.slack);
        }
    }

    onSubmit = async (evt) => {
        evt.preventDefault();
        const {username, password, confirmPassword} = this.state.formData;

        if (password !== confirmPassword) {
            this.setState({error: 'Passwords do not match', loading: false})
            return;
        }

        try {
            this.setState({loading: true, error: null});
            const response = await client.post('/registration', {
                username, // username: username
                password, // password: password
            });

            this.props.history.push(routes.registrationCheckEmail);
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
        const {username, password, confirmPassword} = this.state.formData;

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
                    <div className="form-group">
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-control"
                            type="password"
                            placeholder="Input your password"
                            value={confirmPassword}
                            onChange={(evt) => this.onChange(evt)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-success" disabled={this.state.loading}>Register</button>
                </form>
            </div>
        );
    }
}

Registration.propTypes = {};

export default Registration;
