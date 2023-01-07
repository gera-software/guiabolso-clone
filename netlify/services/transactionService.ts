import { AccountType, Transaction } from "../types";
import * as AccountRepository from "../repositories/accountRepository";
import * as TransactionRepository from "../repositories/transactionRepository";

/**
 * Adiciona uma transação no cartão de crédito
 * 
 * Vverificar o fechamento e vencimento do cartão para definir a fatura de qual mês em que será lançada a transação
 * 
 * @param transaction 
 */
export async function addCreditCardTransaction(transaction: Transaction): Promise<Transaction | null | undefined> {
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

    let doc: Transaction | null = await TransactionRepository.create(transaction);
    // TODO no caso de cartão de credito talvez não seja necessário atualizar o balanço.
    await AccountRepository.addToBalance(transaction.accountId.toString(), transaction.amount.valueOf());
    
    console.log(doc)
    return doc
}

/**
 * Adiciona uma transação na conta corrente
 * @param transaction 
 * @returns 
 */
export async function addCheckingAccountTransaction(transaction: Transaction): Promise<Transaction | null | undefined> {
    let doc: Transaction | null = await TransactionRepository.create(transaction);
    await AccountRepository.addToBalance(transaction.accountId.toString(), transaction.amount.valueOf());
    
    console.log(doc)
    return doc
}

/**
 * Adiciona uma transação à vista (dinheiro vivo)
 * @param transaction 
 * @returns 
 */
export async function addCashTransaction(transaction: Transaction): Promise<Transaction | null | undefined> {
    let doc: Transaction | null = await TransactionRepository.create(transaction);
    await AccountRepository.addToBalance(transaction.accountId.toString(), transaction.amount.valueOf());
    
    console.log(doc)
    return doc
}