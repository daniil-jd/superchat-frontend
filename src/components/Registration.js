import React, {Component} from 'react';
import client from "../http/client";

class Registration extends Component {

    onSubmit = async () => {
        try {
            const response = await client.post('/registration', {

            });

        } catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <div>
                Registration page
            </div>
        );
    }
}

Registration.propTypes = {};

export default Registration;
