import React, {Component} from 'react';
import client from "../http/client";
import CondensedMemoCard from "./CondensedMemoCard";
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
            console.log('welcome mount')
            // this.setState({loading: true, error: null});
            // const response = await client.get('/memos/recent/condensed');
            // const items = response.data;

            // this.setState({items, loading: false});
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
                    {items.map(o => <div className="col-4 mb-3" key={o.id}><CondensedMemoCard item={o} /></div>)}
                </div>
            </div>
        );
    }
}

Welcome.propTypes = {};

export default Welcome;
