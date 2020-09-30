import React from 'react'
import { AppBar, Toolbar, IconButton, Button, Typography }  from "@material-ui/core";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

class TopBar extends React.Component{
    render () {
        const classes = this.props
        const username  = this.props.username;
        console.log(username)
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Documents - PMS
                        </Typography>
                        <Button color="inherit">{username}</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(useStyles)(TopBar)
