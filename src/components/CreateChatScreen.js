import React, {Component} from 'react';
import client from "../http/client";
import {extractError} from "../utils/utils";
import Loader from "./Loader";
import AuthenticationContext from "../context/AuthenticationContext";

class CreateChatScreen extends Component {
    state = {
        loading: false,
        formData: {
            name: '',
            members: [],
            typedMember: '',
            selectedMembers: [],
        },
        error: null,
    };

    onChatNameChange = (evt) => {
        const {name, value} = evt.target;
        const formData = {...this.state.formData, [name]: value};
        this.setState({formData: formData});
    };

    onChangeData = (evt) => {
        const {value} = evt.target;
        this.setState({typedMember: value});
    };

    onSubmit = async (evt) => {
        evt.preventDefault();
        const name = this.state.formData.name;
        let selectedMembers = this.state.selectedMembers;

        if (name === undefined || name.length < 4 || name.length > 15) {
            this.setState({error: "Chat name is not valid. Please input name between 4 and 15 characters."});
            return;
        }

        if (selectedMembers === undefined || selectedMembers.size < 2) {
            this.setState({error: "Chat members is not valid. Please select two or more members."});
            return;
        }

        selectedMembers = selectedMembers.concat(localStorage.getItem("username"));
        console.log(selectedMembers);
        try {
            this.setState({loading: true, error: null});
            const response = await client.post('/rooms', {
                name: name,
                members: selectedMembers,
            });
            this.setState({loading: false, error: null});
        } catch (e) {
            this.setState({error : extractError(e), loading: false});
            return;
        }

        this.setState({
            name: '',
            typedMember: '',
            selectedMembers: [],
        });
    };

    addSelectedUserToArray =() => {
        const {typedMember} = this.state;
        if (typedMember === null
            || typedMember === undefined
            || typedMember.length < 3
            || this.state.selectedMembers !== undefined
            && this.state.selectedMembers.indexOf(typedMember) !== -1
        ) {
            this.setState({
                typedMember: '',
                error: 'Not valid username.'
            });
            return;
        }

        if (this.state.selectedMembers === undefined) {
            this.setState({
                selectedMembers: [typedMember]
            });
        } else {
            this.setState({
                selectedMembers: this.state.selectedMembers.concat(typedMember)
            });
        }

        this.setState({
            typedMember: ''
        });
    };

    onSelectedMemberClick = (evt, selected, key) => {
        evt.preventDefault();
        console.log(selected);

        let changedArray = this.state.selectedMembers;
        changedArray.splice(key, 1);

        this.setState({
            selectedMembers: changedArray
        });
    };

    componentDidMount = async () => {
        try {
            this.setState({loading: true, error: null});
            const response = await client.get('/users');
            const members = (response.data);
            this.setState({members: members, error: null, loading: false});
        } catch (e) {
            this.setState({error : extractError(e), loading: false});
        }

    };

    render() {
        const {members} = this.state;
        let {name} = this.state;
        const {selectedMembers} = this.state;
        let {typedMember} = this.state;

        if (members == null) {
            return null;
        }

        if (typedMember === undefined) {
            typedMember = "";
        }

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
                        <label htmlFor="name">Chat name:</label>
                        <input
                            id="name"
                            name="name"
                            className="form-control"
                            type="text"
                            placeholder="Input unique chat name"
                            value={name}
                            onChange={(evt) => this.onChatNameChange(evt)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="members">Chat members:</label>
                        <input
                            id="members"
                            name="members"
                            type="text"
                            list="data"
                            value={typedMember}
                            className="form-control"
                            onChange={(evt) => this.onChangeData(evt)}
                            placeholder="Select users to add in new chat"
                        />
                        <datalist id="data" >
                            {members.map((item, key) =>
                                <option key={key} value={item.username} />
                            )}
                        </datalist>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-outline-success" disabled={this.state.loading} onClick={this.addSelectedUserToArray}>Add user</button>
                    </div>

                    {
                        selectedMembers !== undefined &&
                        <div className="list-group">
                            {selectedMembers.map((item, key) =>
                                <a href="#" key={key} className="list-group-item list-group-item-action" onClick={(evt) => this.onSelectedMemberClick(evt, item, key)}>
                                    <div className="form-group">{item}</div>
                                </a>
                            )}
                        </div>
                    }

                    <button type="submit" className="btn btn-outline-success" disabled={this.state.loading}>Create</button>
                </form>
            </div>
        );
    }
}
CreateChatScreen.propTypes = {};
CreateChatScreen.contextType = AuthenticationContext;

export default CreateChatScreen;

