import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const MessageBox = styled('div')`
    width : 100%
    min-height : 20px;
    height : auto;
    display : flex;
    flex-direction : ${props => props.me ? 'row-reverse' : 'row'};
    margin : 1px 10px;
`;

const Message = styled('div')`
    max-width : 70%;
    display : flex;
    flex-direction : ${props => props.me ? 'row-reverse' : 'row'};
    padding : 1px;
    overflowWrap: "break-word",
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
        marginRight : 15
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
        marginLeft : 5
    }
});



const message= (props) => {
    const { classes } = props;
    return (
        <MessageBox me={props.me}>
            <Message me={props.me} >
                { !props.me && <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
                        <Avatar
                            className={classes.avatar}
                            src="https://images.pexels.com/photos/946343/pexels-photo-946343.jpeg?auto=compress&cs=tinysrgb&h=650&w=940%20940w,%20https://images.pexels.com/photos/946343/pexels-photo-946343.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260%201260w,%20https://images.pexels.com/photos/946343/pexels-photo-946343.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940%201880w,%20https://images.pexels.com/photos/946343/pexels-photo-946343.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260%202520w"
                        />
                    </div>
                }

                <Typography variant='subtitle1' className={ props.me ? classes.myText : classes.otherText }>
                    Microstrip patch antenna is a popular antenna widely used due to its compact size. They are used in a variety of fields. In this project, the antenna was designed for WLAN application, particularly in IEEE 802.11a standard. The target resonant frequency was selected to be 5.2 GHz. The antenna parameters were calculated after setting this frequency. The antenna was designed by the simulation software.  After a lot of simulations, the best possible values were chosen by trial-and-error method.
                </Typography>
            </Message>
        </MessageBox>
    )
};

export default withStyles(styles)(message);