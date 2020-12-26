import {useContext} from "react";
import {ExpenseTrackerContext} from "./context/context";

import {incomeCategories, expenseCategories, resetCategories} from "./constants/categories"


const useTransaction = (title:string) => {
    resetCategories();
    const  {state: transactions} = useContext(ExpenseTrackerContext);
    const selectedTransaction = transactions.filter((t) => t.type === title);
    const total = selectedTransaction.reduce((acc, currVal) => acc+= currVal.amount, 0 )
    const categories = title === "Income" ? incomeCategories : expenseCategories; 

    categories.forEach(category =>  {
        category.amount = selectedTransaction.filter((t) => t.category === category.type).reduce((acc, curVal) => acc+= curVal.amount, 0)
    })

    const filteredCategories = categories.filter(c => c.amount > 0);

    const chartData = {
        datasets:[{
            data: filteredCategories.map(c => c.amount),
            backgroundColor:  filteredCategories.map(c => c.color)
        }],
        labels: filteredCategories.map(c => c.type)
    }

    return  { filteredCategories, total, chartData }

}

export default useTransaction;