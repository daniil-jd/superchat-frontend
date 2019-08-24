import React, {Component} from 'react';
import routes from "../routes/routes";
import client from "../http/client";
import {extractError} from "../utils/utils";
import AuthenticationContext from "../context/AuthenticationContext";
import Authentication from "./Authentication";
import PropTypes from "prop-types";

class RegistrationConfirmation extends Component {

    componentDidMount = async () => {
        const token = new URL(window.location.href).searchParams.get('token');
        const username = new URL(window.location.href).searchParams.get('username');
        console.log(username);

        try {
            this.setState({loading: true, error: null});
            const response = await client.get('/registration/confirmation?token=' + token);
            const {authenticationToken} = response.data; // const token = response.token;
            this.setState({error: null, loading: false});

            // setState нужно делать до push
            this.context.authenticate(username, authenticationToken);
            this.props.history.push(routes.slack);
        } catch (e) {
            this.setState({error : extractError(e), loading: false});
        }

    };

    render() {
        return (
            <div>
                RegistrationConfirmation!
            </div>
        );
    }
}

RegistrationConfirmation.propTypes = {
    history: PropTypes.object.isRequired
};
RegistrationConfirmation.contextType = AuthenticationContext;

export default RegistrationConfirmation;
