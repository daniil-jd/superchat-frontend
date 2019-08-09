import React, {Component} from 'react';
import PropTypes from 'prop-types';
import client from '../http/client';
import { extractError } from "../utils/utils.js";
import MemoCard from "./MemoCard.js";
import Loader from "./Loader.js";

class RecentMemos extends Component {
    state = {
        loading: false,
        items: [],
        error: null,
    };

    async componentDidMount() {
        console.log('RecentMemos mount');
        try {
            // this.setState({loading: true, error: null});
            // const response = await client.get('/memos/recent');
            // const items = response.data;
            //
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
                    {items.map(o => <div className="col-6 mb-3" key={o.id}><MemoCard item={o} /></div>)}
                </div>
            </div>
        );
    }
}

RecentMemos.propTypes = {};

export default RecentMemos;
