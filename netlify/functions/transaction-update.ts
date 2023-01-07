import { Handler } from "@netlify/functions";
import * as TransactionRepository from "../repositories/transactionRepository";
import { Transaction, CurrencyCodes, TransactionType, TransactionStatus, AccountType } from "../types";
import * as AccountRepository from '../repositories/accountRepository'

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
            let invoiceMonth = creditCardDate.getUTCMonth() // between 0 and 11
            let invoiceYear = creditCardDate.getUTCFullYear()

            const invoiceDate = new Date(Date.UTC(+invoiceYear, +invoiceMonth, 1))
            console.log('INVOICE DATE', invoiceDate.toISOString())

            const account = await AccountRepository.getById(transaction.accountId)
            const closeDay = +(account?.creditData?.closeDay ?? 0)
            const dueDay = +(account?.creditData?.dueDay ?? 0)
            
            const closingDate = new Date(Date.UTC(+invoiceYear, +invoiceMonth, closeDay, 0, 0, 0))
            console.log('CLOSING DATE', closingDate.toISOString())

            const dueDate = new Date(Date.UTC(+invoiceYear, +invoiceMonth, dueDay, 0, 0, 0))
            console.log('DUE DATE', dueDate.toISOString())

            console.log('ACCOUNT', creditCardDate.toISOString(), closeDay, dueDay)

            transaction.creditCardDate = creditCardDate
            // move a transação para a data de vencimento da fatura correspondente
            if(creditCardDate >= closingDate) {
                dueDate.setUTCMonth(dueDate.getUTCMonth() + 1)
                console.log('dentro da fatura do mes que vem', dueDate.toISOString())
            } else {
                console.log('dentro da fatura do mes atual', dueDate.toISOString())
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

    // TODO se trocar uma transação de account, dá algum problema no balanço das contas! Porque não está descontando a alteração 
    let docBeforeUpdate: Transaction | null;
    try {
        docBeforeUpdate = await TransactionRepository.findOneAndUpdate(transaction);
        if(docBeforeUpdate) {
            const balance = -docBeforeUpdate.amount + transaction.amount.valueOf()
            const account = await AccountRepository.addToBalance('' + transaction?.accountId.toString(), balance);
        }
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
