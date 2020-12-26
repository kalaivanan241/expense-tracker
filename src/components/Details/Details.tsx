import React from 'react'
import { Card, CardHeader,CardContent, Typography }  from "@material-ui/core"
import {Doughnut} from "react-chartjs-2"
import useStyles from "./styles";
import useTransactions from "../../useTransactions";

export interface DetailsProps{
    title:string
}

const Details:React.FC<DetailsProps> = ({title}) => {
    const classes = useStyles();
    const { total, chartData} = useTransactions(title);
    return (
        <Card className={title === "Income" ? classes.income: classes.expense}>
            <CardHeader title = {title === "Income"?  title : "Expense" } />
            <CardContent>
                <Typography variant="h5"> ${total}</Typography>
                 <Doughnut data={chartData}> </Doughnut>
            </CardContent>
        </Card>
    )
}

export default Details
