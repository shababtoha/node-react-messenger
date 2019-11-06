import React  from 'react';
import Toolbar from './toolbar'
import PhoneIcon from '@material-ui/icons/Phone';
import VideoIcon from '@material-ui/icons/Videocam'
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';


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
                {props.messages}
                <div style={{ margin : "5px 5px"}} />
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