import React, {useReducer, createContext, Dispatch} from 'react'
import contextReducer from "./contextReducer"

const ls = localStorage.getItem("transactions") ? localStorage.getItem("transactions") : ""; 

const initialState:TransactionType[] = ls ?  JSON.parse(ls) : []


export interface TransactionType {
    id: string;
    type: string;
    amount: number;
    category: string;
    date: string;
}

export const ExpenseTrackerContext = createContext<{
    state:TransactionType[], 
    dispatch:Dispatch<any>, balance:number}>({
        state: initialState,
        dispatch: () => null,
        balance:0,
});

const Provider:React.FC = ({children}) => {
    const [state, dispatch] = useReducer(contextReducer, initialState);

    // const deleteTransaction = (id:string) => dispatch({type:"DELETE_TRANSACTION", payload: id})
    // const addTransaction = (transaction:TransactionType) => dispatch({type:"ADD_TRANSACTION", payload:transaction});
    // console.log(state);
    const balance = state.reduce((acc:number, curVal:TransactionType) => curVal.type === "Expense" ? acc - curVal.amount : acc + curVal.amount, 0 )
    return (
        <ExpenseTrackerContext.Provider value={{state, dispatch, balance }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}

export default Provider;
