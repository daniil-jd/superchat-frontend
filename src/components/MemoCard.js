import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from "../http/client";
import Loader from "./Loader.js";
import { extractError } from "../utils/utils.js";

class MemoDetails extends Component {
    render() {
        const {item} = this.props;

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
    }
}

MemoDetails.propTypes = {
    item: PropTypes.object.isRequired
};

export default MemoDetails;
