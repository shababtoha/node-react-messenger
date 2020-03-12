import React  from 'react';
import Toolbar from '../presentational/toolbar'
import PhoneIcon from '@material-ui/icons/Phone';
import VideoIcon from '@material-ui/icons/Videocam'
import TextField from "@material-ui/core/TextField/index";
import { withStyles } from '@material-ui/core/styles/index';
import { Mutation } from "react-apollo";
import { CREATE_MESSAGE_QUERY , GET_MESSAGE_QUERY } from './queries';
import IconButton from '@material-ui/core/IconButton';


const styles = theme => ({
    inputDiv : {
        borderTop : "1px solid #bbbbbf",
        paddingLeft : 5,
        overflowWrap: "break-word",
        marginTop : "auto",
        height : 35,
        flex : "0 1",
    },
    messages : {
        flex : "1 1 auto",
        display : 'flex',
        flexDirection: 'column-reverse',
        overflowY : "scroll",
        paddingBottom : 10
    },
    container : {
        display : "flex",
        flexDirection : "column",
        height : '100vh',

    },
});

const messageContainer = (props) => {
    const {classes} = props;
    let rightIcons = [
        <IconButton>
            <VideoIcon color="primary" style={{ fontSize: 25 }}/>
        </IconButton>,
        <IconButton>
            <PhoneIcon color="primary" style={{ fontSize : 25 }}/>
        </IconButton>
        ,
    ];
    let rightItems = rightIcons.map((item,key)=> <span key={key}> {item} </span>);
    return (
        <div className={classes.container}>
            <Toolbar
                title={ props.title? props.title : "Conversation Title" }
                rightItems = {rightItems}
            />
            <div className={classes.messages}>
                {props.messages}
                <div style={{ margin : "5px 5px"}} />
            </div>
            <div className={classes.inputDiv}>
                <Mutation mutation={CREATE_MESSAGE_QUERY}
                    update={(cache, { data : { createMessage } }) => {
                        // const { getMessages } =  cache.readQuery({
                        //     query: GET_MESSAGE_QUERY,
                        //     variables : {
                        //         conversationId: props.conversationId
                        //     }
                        // });
                        // console.log(cache.data.data);
                        // cache.writeQuery({
                        //     query: GET_MESSAGE_QUERY,
                        //     variables : {
                        //         conversationId: props.conversationId
                        //     },
                        //     data: {
                        //         getMessages: [createMessage].concat(getMessages)
                        //     }
                        // });
                        // console.log("cache" + cache);
                    }}
                >
                    {(sendMessage) => (
                        <TextField
                            id="newText"
                            multiline
                            rowsMax="4"
                            fullWidth
                            onKeyUp={e => {
                                const key = e.keyCode;
                                if(key === 13 && !e.shiftKey) {
                                    sendMessage({
                                        variables: {
                                            MessageInput: {
                                                message: props.value,
                                                conversationId: props.conversationId
                                            }
                                        }
                                    });
                                    e.target.value = "";
                                    props.onChange("");
                                } else {
                                    props.onChange(e.target.value);
                                }
                            }}
                        />
                        )}
                </Mutation>
            </div>
        </div>
    )
};

export default withStyles(styles)(messageContainer);