import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const MessageBox = styled('div')`
    height: 100%; 
    width : 100%;
    display : flex;
    flex-direction : ${ props => props.me ?  "row-reverse" : "row" }
`;

const Message = styled('div')`
    max-width : 80%;
    padding : 1px;
    display : flex;
    
`;

const styles= theme => ({
    myText : {
        fontSize: 14,
        lineHeight: 1.2,
        padding: "10px",
        backgroundColor: "#007aff",
        color: "white",
        borderTopRightRadius : 20,
        borderBottomRightRadius : 20,
        borderTopLeftRadius : 20,
        borderBottomLeftRadius: 20,
        textAlign : 'right',
    },
    otherText : {
        fontSize: 14,
        lineHeight: 1.2,
        padding: "10px",
        color: 'black',
        borderTopRightRadius : 20,
        borderBottomRightRadius : 20,
        borderTopLeftRadius : 20,
        borderBottomLeftRadius: 20,
        backgroundColor: "#CFD3CE",
        marginLeft : 5,
        textAlign : 'left',
    },
    avatar: {
        height : 30,
        width : 30,
        bottom : 3
    }
});

const message= (props) => {
    const { classes } = props;
    return (
        <div style={{  margin : "1px 5px" }}>
            <MessageBox  me={props.me}>
                <Message me={props.me} >
                    <div style={{display : 'flex', flexDirection : 'column-reverse' }}>
                    {   !props.me &&
                        <Avatar
                            src="https://images.pexels.com/photos/946343/pexels-photo-946343.jpeg?auto=compress&cs=tinysrgb&h=650&w=940%20940w,%20https://images.pexels.com/photos/946343/pexels-photo-946343.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260%201260w,%20https://images.pexels.com/photos/946343/pexels-photo-946343.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940%201880w,%20https://images.pexels.com/photos/946343/pexels-photo-946343.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260%202520w"
                            className={classes.avatar}
                        />
                    }
                    </div>
                    <Typography className={ props.me ? classes.myText : classes.otherText } >
                        { props.text }
                    </Typography>
                </Message>
            </MessageBox>
        </div>
    )
};

export default withStyles(styles)(message);