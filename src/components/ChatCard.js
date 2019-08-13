import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatDetails extends Component {
    render() {
        const {item} = this.props;

        return (
            <div className="card">
                <img src="https://via.placeholder.com/900x300" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Name: {item.name}</h5>
                    <p className="card-text">Author: {item.creator.username}</p>
                    {/*<div className="card-text">*/}
                        {/*{item.members.map(o => <div className="col-6 mb-3" key={o.username}></div>)}*/}
                        {/*/!*{item.members}*!/*/}
                    {/*</div>*/}
                    <div>
                        {/*<button className="btn btn-light" onClick={() => this.onChat(item)}><span role="img" aria-label="thumbs-up">Беседа</span></button>*/}
                        {/*<button className="btn btn-light"><span role="img" aria-label="thumbs-down">&#x1F44D;</span></button>*/}
                        {/*<span className="btn">{item.likes}</span>*/}
                    </div>
                </div>
                <div className="card-footer">
                    {/*{item.tags.map(o => <a href="" key={o} className="card-link">#{o}</a>)}*/}
                </div>
            </div>
        );
    }
}

ChatDetails.propTypes = {
    item: PropTypes.object.isRequired
};

export default ChatDetails;
