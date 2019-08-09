import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AuthenticationContext from "../context/AuthenticationContext";
import {Link} from "react-router-dom";
import routes from "../routes/routes.js";

class CondensedMemoCard extends Component {
    render() {
        const {id, content} = this.props.item;
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-text">
                        {content}
                    </div>
                    <Link to={routes.memoDetails.replace(':id', id)} className="card-link">View Details</Link>
                </div>
            </div>
        );
    }
}

CondensedMemoCard.propTypes = {
    item: PropTypes.object.isRequired
};
CondensedMemoCard.contexType = AuthenticationContext;

export default CondensedMemoCard;
