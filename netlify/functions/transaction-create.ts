import { Handler } from "@netlify/functions";
import * as TransactionRepository from "../repositories/transactionRepository";
import * as AccountRepository from "../repositories/accountRepository";
import { Transaction, CurrencyCodes, TransactionType, TransactionStatus } from "../types";

const handler: Handler = async (event, context) => {
    // {
    //     "pluggyTransactionId": "dsaddasd",
    //     "description": "Stringsdaasd",
    //     "descriptionOriginal": "",
    //     "amount": -3000,
    //     "currencyCode": "BRL",
    //     "date": "2022/11/13",
    //     "category": {
    //         "_id": "6368226650320103b4aa108e",
    //         "name": "Transporte",
    //         "iconName": "ICON",
    //         "primaryColor": "green"
    //     },
    //     "type": "EXPENSE",
    //     "syncType": "MANUAL",
    //     "status": "POSTED",
    //     "comment": "comentario",
    //     "ignored": false,
    //     "accountId": "6371717be128f3741973f5cb",
    //     "userId": "6371717be128f3741973f5cb",
    //     "_isDeleted": false
    // }
    if (!event.body) {
        return {
            statusCode: 400,
        };
    }

    const transaction = JSON.parse(event.body) as Transaction;
    let doc: Transaction | null;
    try {
        doc = await TransactionRepository.create(transaction);
        const account = await AccountRepository.addToBalance(transaction.accountId.toString(), transaction.amount.valueOf());
        console.log(account)
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(transaction),
    };
};

export { handler };
