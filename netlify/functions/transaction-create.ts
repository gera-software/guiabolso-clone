import { Handler } from "@netlify/functions";
import * as TransactionRepository from "../repositories/transactionRepository";
import * as AccountRepository from "../repositories/accountRepository";
import { Transaction, CurrencyCodes, TransactionType, TransactionStatus, AccountType } from "../types";

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

    // se é cartão de credito, verificar o fechamento e vencimento do cartão para definir em qual mês será lançada a transação
    try {
        if(transaction.accountType == AccountType.CREDIT_CARD && transaction.category?.name !== 'Pagamento de cartão') {
            const creditCardDate = new Date(transaction.creditCardDate ?? '')
            let invoiceMonth = creditCardDate.getMonth()
            let invoiceYear = creditCardDate.getFullYear()

            const invoiceDate = new Date(
                invoiceYear, 
                invoiceMonth, 
                1, 
                0, 0, 0);
            console.log('INVOICE DATE', invoiceDate.toLocaleString())

            const account = await AccountRepository.getById(transaction.accountId)
            const closeDay = +(account?.creditData?.closeDay ?? 0)
            const dueDay = +(account?.creditData?.dueDay ?? 0)
            
            const closingDate =  new Date(
                invoiceYear, 
                invoiceMonth, 
                closeDay, 
                0, 0, 0);
            console.log('CLOSING DATE', closingDate.toLocaleString())

            const dueDate = new Date(
                invoiceYear, 
                invoiceMonth, 
                dueDay, 
                0, 0, 0);
            console.log('DUE DATE', dueDate.toLocaleString())

            console.log('ACCOUNT', creditCardDate.toLocaleDateString(), closeDay, dueDay)

            transaction.creditCardDate = creditCardDate
            // move a transação para a data de vencimento da fatura correspondente
            if(creditCardDate >= closingDate) {
                dueDate.setMonth(dueDate.getMonth() + 1)
                console.log('dentro da fatura do mes que vem', dueDate.toLocaleString())
            } else {
                console.log('dentro da fatura do mes atual', dueDate.toLocaleString())
            }
            transaction.date = dueDate
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }

    console.log(transaction)
    let doc: Transaction | null;
    try {
        doc = await TransactionRepository.create(transaction);
        const account = await AccountRepository.addToBalance(transaction.accountId.toString(), transaction.amount.valueOf());
        // console.log(account)
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
