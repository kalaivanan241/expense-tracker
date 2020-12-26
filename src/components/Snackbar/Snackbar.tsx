import React from 'react'
import {Snackbar as MuiSnackBar} from "@material-ui/core"
import MuiAlert from "@material-ui/lab/Alert"

import useStyles from "./styles"

export interface CustomizedSnackbarProps {
    open:boolean;
    setOpen: (e:boolean) =>  void;
}

const CustomizedSnackbar:React.FC<CustomizedSnackbarProps> = ({open, setOpen}) => {
    const classes = useStyles();
    const handleClose = (event:React.SyntheticEvent) =>
    {
        setOpen(false)
    }
    return (
        <div className={classes.root}>
            <MuiSnackBar 
                anchorOrigin={{vertical:"top", horizontal:"right"}} 
                open={open} 
                autoHideDuration={3000} 
                onClose={handleClose}>

                <MuiAlert onClose={handleClose}  severity="success" elevation={6} variant="filled">
                    Transaction successfully created
                </MuiAlert>
            </MuiSnackBar>
        </div>
    )
}

export default CustomizedSnackbar
