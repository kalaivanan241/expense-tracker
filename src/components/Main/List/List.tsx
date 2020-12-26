import React, {useContext} from 'react'
import {List as MUIList, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Slide, Avatar} from "@material-ui/core"
import { Delete, MoneyOff} from "@material-ui/icons"

import { ExpenseTrackerContext } from "./../../../context/context"

import useStyles from  "./styles"; 

const List = () => {
    const classes = useStyles();
    
    const {state:transactions, dispatch} = useContext(ExpenseTrackerContext);

    const onDelete = (id:string) => {
        dispatch({
            type:"DELETE_TRANSACTION",
            payload:id
        })
    }
    

    return (
        <MUIList dense={false} className={classes.list}>
            {transactions.map((transaction) => (
                <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type === "Income" ? classes.avatarIncome : classes.avatarExpense}>
                                <MoneyOff/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}`} />
                        <ListItemSecondaryAction aria-label="delete" onClick={()=>onDelete(transaction.id) }>
                            <Delete/>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}
        </MUIList>
    )
}

export default List
