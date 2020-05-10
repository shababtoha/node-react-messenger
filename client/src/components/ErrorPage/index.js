import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    container: {
        position: "absolute",
        left: "50%",
        top: "50%",
        textAlign: "center",
        transform: "translate(-50%, -50%)",
    },
    header: {
        fontFamily: "Montserrat",
        fontSize: theme.spacing(20),
        fontWeight: 900,
        lineHeight: 0.8,
    },
    caption: {
        fontFamily: "Montserrat",
    },
}));

const ErrorPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography className={classes.header} variant="h1">
                404
            </Typography>
            <Typography className={classes.caption} variant="h5">
                Page not found
            </Typography>
            <Link href="/message">Back to Home</Link>
        </div>
    );
};

export default ErrorPage;
