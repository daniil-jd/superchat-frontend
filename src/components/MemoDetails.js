import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from "../http/client";
import Loader from "./Loader.js";
import { extractError } from "../utils/utils.js";

class MemoDetails extends Component {
    state = {
        loading: true,
        item: null,
        error: null,
    };

    async componentDidMount() {
        console.log('MemoDetails mount');
        try {
            const id = this.props.match.params.id; // id подставит React Router (из :id)

            this.setState({loading: true, error: null});
            const response = await client.get(`/memos/${id}`);
            const item = response.data;

            this.setState({item, loading: false});
        } catch (e) {
            this.setState({error : extractError(e), loading: false});
        }
    }

    onLike = () => {
        // TODO: post likes + 1
        // TODO: get item by id
    };

    render() {
        if (this.state.loading) {
            return (<Loader/>);
        }

        const {item} = this.state;

        return (
            <div className="card">
                <img src="https://via.placeholder.com/900x300" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Author: {item.author.name}</h5>
                    <p className="card-text">{item.content}</p>
                    <div>
                        <button className="btn btn-light"><span role="img" aria-label="thumbs-up">&#x1F44E;</span></button>
                        <button className="btn btn-light"><span role="img" aria-label="thumbs-down">&#x1F44D;</span></button>
                        <span className="btn">{item.likes}</span>
                    </div>
                </div>
                <div className="card-footer">
                    {item.tags.map(o => <a href="" key={o} className="card-link">#{o}</a>)}
                </div>
            </div>
        );
        // console.log(this.state.loading);
        // if (this.state.loading) {
        //     return (
        //         <div className="spinner-border" role="status">
        //             <span className="sr-only">Loading...</span>
        //         </div>
        //     );
        // }
        //
        // const {item} = this.state;
        //
        // if (item === null) {
        //     return null;
        // }
        //
        //
        // return (
        //     <div>
        //         {
        //             item ?
        //                 <div>
        //                     <p>{item.content}</p>
        //                     <p>{item.author}</p>
        //                     <p>Likes: {item.likes}</p>
        //                     <div>
        //                         <button onClick={() => this.onLike()}>like</button>
        //                         <button>dislike</button>
        //                     </div>
        //                 </div>
        //                 : null
        //         }
        //
        //     </div>
        // );
    }
}

MemoDetails.propTypes = {
    match: PropTypes.object.isRequired
};

export default MemoDetails;
