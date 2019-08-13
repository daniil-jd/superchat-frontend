import React, {Component} from 'react';
import Loader from "./Loader.js";
import { extractError } from "../utils/utils.js";

class Welcome extends Component {
    state = {
        loading: false,
        items: [],
        error: null,
    };

    async componentDidMount() {
        try {

        } catch (e) {
            this.setState({error : extractError(e), loading: false});
        }
    }

    render() {
        if (this.state.loading) {
            return (<Loader />);
        }

        const {items} = this.state;
        return (
            <div className="container">
                <div className="row">

                </div>
            </div>
        );
    }
}

Welcome.propTypes = {};

export default Welcome;
