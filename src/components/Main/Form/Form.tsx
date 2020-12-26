import React, { ChangeEvent, useState, useContext, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {useSpeechContext} from "@speechly/react-client";
import  { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem} from "@material-ui/core";
import  {ExpenseTrackerContext} from "../../../context/context"
import useStyles from "./styles";
import { formatDate} from "../../../utils/utils";
import {incomeCategories, expenseCategories} from "../../../constants/categories"
import CustomizedSnackbar from '../../Snackbar/Snackbar';


const Form = () => {
    const classes = useStyles();
    const initialState = {
        amount:"",
        date: formatDate(new Date()),
        type: "Expense",
        category:""
    }
    const [transaction, setTransaction] = useState(initialState);
    const [open, setOpen] = useState(false);

    const { dispatch } = useContext(ExpenseTrackerContext);
    const { segment } = useSpeechContext();
    
    const onFieldChange = (e: ChangeEvent<{name?:string | any, value:unknown}>) => {
        setTransaction({...transaction,[e.target?.name]:e.target.value})
    }

    const addTransaction = () => {
        if(isNaN(Number(transaction.amount)) || !transaction.date.includes("-"))
            return;
        dispatch({
            type:"ADD_TRANSACTION",
            payload:{...transaction, id:uuidv4(), amount:Number(transaction.amount)}
        })
        setOpen(true);
        setTransaction(initialState);  
    }

    useEffect (() => {
        if(segment) {
            if(segment.intent.intent === "add_expense")
            {
                setTransaction({...transaction, type:"Expense"})
            }
            else if(segment.intent.intent === "add_income")
            {
                setTransaction({...transaction, type:"Income"})
            }
            else if(segment.isFinal && segment.intent.intent === "create_transaction")
            {
                return addTransaction()
            }
            else if(segment.isFinal && segment.intent.intent === "cancel_transaction")
            {
                return setTransaction(initialState)
            }
        

        segment?.entities.forEach(entity => {
            
            switch (entity.type) {
                case 'amount':
                    setTransaction({...transaction, amount:entity.value});
                    break;
                case 'category':
                    const category = `${entity.value.charAt(0)}${entity.value.slice(1).toLowerCase()}`;
                    if(incomeCategories.map(iC => iC.type).includes(category))
                        setTransaction({...transaction,category: category, type:"Income" });
                    if(expenseCategories.map(iC => iC.type).includes(category))
                        setTransaction({...transaction,category: category, type:"Expense" });
                    break;
                case 'date':
                    setTransaction({...transaction,date: entity.value });
                    break;
                default:
                    break;
            }
        })
        if(segment.isFinal && transaction.amount && transaction.category && transaction.type && transaction.date)
        {
            addTransaction();
        }
    }
    }, [segment,addTransaction,initialState, transaction ])

    const selectedCategories = transaction.type === "Income" ? incomeCategories : expenseCategories;

    return (
        <Grid container spacing={2}>
            <CustomizedSnackbar open={open} setOpen={setOpen}></CustomizedSnackbar>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle1" gutterBottom>
                    {segment ? (
                    <>
                        {segment.words.map(w => w.value).join(" ") }
                    </>) : 
                    (<>...</>)
                    }
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select name="type" onChange={(e) =>onFieldChange(e)} value={transaction.type}>
                        <MenuItem value="Income"> Income </MenuItem>
                        <MenuItem value="Expense"> Expense </MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs ={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select name="category" value={transaction.category} onChange={(e) =>onFieldChange(e)}>
                        {selectedCategories.map(category => (
                            <MenuItem key={category.type} value={category.type} >{category.type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
               <TextField type="number" label="Amount" fullWidth name="amount" value={transaction.amount} onChange={(e) =>onFieldChange(e)}/>
            </Grid>
            <Grid item xs={6}>
               <TextField type="date" label="Date" fullWidth InputLabelProps={{
          shrink: true
        }} name="date" value={transaction.date} onChange={(e) =>onFieldChange(e)}/>
            </Grid>
            <Button className={classes.button} color="primary" fullWidth variant=
            "outlined" onClick={() => addTransaction()}> Create</Button>
        </Grid>
    )
}

export default Form
