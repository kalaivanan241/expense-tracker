import transitions from "@material-ui/core/styles/transitions";
import { Reducer } from "react";
import { TransactionType } from "./context";

export interface ActionType {
    type:string;
    payload:any;
}

const contextReducer:Reducer<any, ActionType> = (state:[TransactionType], action: ActionType) => {
    switch (action.type) {
        case "DELETE_TRANSACTION":
            {
                const transactions = state.filter((t:TransactionType) => t.id !== action.payload)
                localStorage.setItem("transactions" , JSON.stringify(transactions));
                return transactions
            }
        case "ADD_TRANSACTION":
            {
                const transactions = [action.payload,...state] 
                localStorage.setItem("transactions" , JSON.stringify(transactions));
                return transactions
            }
        default:
            return state;
    }
}

export default contextReducer;

// Reducer  => a function that takes in the old state, and an action => new state

