import React  from 'react';
import Toolbar from './toolbar'
import PhoneIcon from '@material-ui/icons/Phone';
import VideoIcon from '@material-ui/icons/Videocam'
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import Message from './message';

const styles = theme => ({
    inputDiv : {
        borderTop : "1px solid #bbbbbf",
        paddingLeft : 5,
        overflowWrap: "break-word",
        marginTop : "auto",
        height : 35,
        flex : "flex: 0 1",

    },
    messages : {
        //marginBottom : "auto",
        flex : "1 1 auto",
        display : 'flex',
        flexDirection: 'column-reverse',
        overflowY : 'scroll',
        overflowX : 'hidden',
    },
    container : {
        display : "flex",
        flexDirection : "column",
        height : '100%',

    },
    input : {
        underline : 'none'
    }
});


const messageContainer = (props) => {
    const {classes} = props;
    return (
        <div className={classes.container}>
            <Toolbar
                title={ "Conversation Title" }
                rightItems = {[
                    <VideoIcon color="primary" style={{ fontSize: 25 }}/>,
                    <PhoneIcon color="primary" style={{ fontSize : 25 }}/> ,
                ]}
            />
            <div className={classes.messages}>
                <Message me={true} />
                <Message />
                <Message />


            </div>
            <div className={classes.inputDiv}>
                <TextField
                    id="newText"
                    multiline
                    rowsMax="4"
                    fullWidth
                    placeholder="type to chat"
                />
            </div>
        </div>
    )
};


export default withStyles(styles)(messageContainer);