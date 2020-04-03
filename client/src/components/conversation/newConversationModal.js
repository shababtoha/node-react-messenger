import React, { Component } from 'react';
import { ModalContainer, Modal } from './styles';
import { Autocomplete } from '@material-ui/lab';
import TextField from "@material-ui/core/TextField";
import { withApollo } from 'react-apollo';
import { withRouter } from "react-router-dom";
import {
    GET_USERS_QUERY ,
    CREATE_CONVERSATION_QUERY,
    CHECK_EXISTING_CONVERSATION_QUERY
} from './queries'
import { Button } from '@material-ui/core';

class newConversationModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            client: props.client,
            filteredUsernames: [],
            title: "",
            placeHolder: "",
            conversationIds: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNewConversationId = this.handleNewConversationId.bind(this);
        this.createConversation = this.createConversation.bind(this);
        this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
        this.getTitlePlaceholder = this.getTitlePlaceholder.bind(this);
        this.checkExistingConversation = this.checkExistingConversation.bind(this);
    }


    handleInputChange(event) {
        let username = event.target.value;
        if(!username) {
            this.setState({
                filteredUsernames: []
            });
            return;
        }
        this.state.client.query({
            query: GET_USERS_QUERY,
            variables: {
                username
            }
        }).then(data => {
            //console.log(data.data.users)
            this.setState({
                filteredUsernames: data.data.users
            })
        }).catch(err => {
            console.log(err);
        })
    }

    handleTitleInputChange(e) {
        let title = e.target.value;
        this.setState({
            title
        })
    }

    handleNewConversationId(conversationIds) {
        this.setState({
            conversationIds
        });
        console.log('autocomplete', this.state)
    }

    createConversation() {
        if(!this.state.conversationIds || !this.state.conversationIds.length) {
            return;
        }
        let newIds = this.state.conversationIds.map(item => item.id);
        console.log("creating", newIds);
        this.state.client.mutate({
            mutation: CREATE_CONVERSATION_QUERY,
            variables: {
                userIds: newIds,
                title: this.state.title
            }
        }).then(data => {
            data.data.createConversation.messages = [];
            this.props.addConversation(this.state.client, data);
        }).catch(err => {
            console.log(err);
        })
    }

    checkExistingConversation() {
        if(!this.state.conversationIds || !this.state.conversationIds.length) {
            return;
        }
        let newIds = this.state.conversationIds.map(item => item.id);
        this.state.client.query({
            query: CHECK_EXISTING_CONVERSATION_QUERY,
            variables: {
                userIds: newIds,
            }
        }).then(data => {
            console.log(data);
            if(data.data.checkExistingConversation) {
                console.log("redirecting");
                this.props.onCancel();
                this.props.history.push('/message'+ data.data.checkExistingConversation);
            }
        }).catch(error => {
            console.log(error);
        })
    }


    getTitlePlaceholder() {
        if(this.state.title || !this.state.conversationIds.length ) {
            return "";
        }
        let placeHolder = "You";
        this.state.conversationIds.forEach((user) => {
            placeHolder+= ","+ user.username;
        });
        return placeHolder;
    }

    componentDidMount() {

    }

    render() {
        return (
            <ModalContainer>
                <Modal>
                    <h2 style={{width: '100%', textAlign: 'center'}}> New Conversation</h2>
                    <TextField
                        label={"Conversation Title"}
                        fullWidth
                        placeholder={this.getTitlePlaceholder()}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.handleTitleInputChange}
                        value={this.state.title}
                    />
                    <Autocomplete
                        multiple
                        onChange={(event,values) => this.handleNewConversationId(values)}
                        id="combo-box-demo"
                        options={this.state.filteredUsernames}
                        getOptionLabel={option => option.username}
                        style={{ width: 'auto', marginTop: 10 }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="standard"
                                fullWidth onChange={this.handleInputChange}
                                label={"Participants"}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        )}
                    />
                    <div style={{ marginTop: 5}}>
                        <Button
                            variant="contained"
                            size="medium"
                            color="primary"
                            style={{ display: 'inlineBlock' }}
                            onClick={()=> this.checkExistingConversation()}
                        >
                            Start Conversation
                        </Button>
                        <Button
                            variant="contained"
                            size="medium"
                            color="primary"
                            style={{ display: 'inlineBlock' }}
                            onClick={this.props.onCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </Modal>
            </ModalContainer>
        )
    }
}

export default withApollo(withRouter(newConversationModal));