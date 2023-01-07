import { connect, disconnect } from "../config/database";
import { Schema, model, Types, PipelineStage } from 'mongoose';
import { CreditCardInvoice } from '../types'
import schema from "./schemas/creditCardInvoiceSchema";

const CreditCardInvoiceModel = model<CreditCardInvoice>('credit_card_invoices', schema);

/**
 * Get a not deleted invoice by account id and dueDate
 * @param id 
 * @returns 
 */
export async function getByDueDate(accountId: string, dueDate: Date): Promise<CreditCardInvoice | null> {
    await connect();
    const result = await CreditCardInvoiceModel.findOne({ accountId: new Types.ObjectId(accountId), dueDate: dueDate, _isDeleted: { $ne: true } });
    await disconnect();
    return result;
}

/**
 * Creates a credit card invoice
 * @param creditCardInvoice 
 * @returns 
 */
export async function create(creditCardInvoice: CreditCardInvoice | null): Promise<CreditCardInvoice | null> {
    // console.log('CREATE', creditCardInvoice)
    await connect();
    const doc = new CreditCardInvoiceModel(creditCardInvoice);
    const result = await doc.save();
    // console.log('RESULT', result)
    await disconnect();

    return result;
}

/**
 * Fetch all (not deleted) invoices by account id
 * @param accountId 
 * @returns 
 */
export async function fetchByAccount(accountId): Promise<CreditCardInvoice[]> {
    await connect();

    const result = await CreditCardInvoiceModel.find({ accountId: new Types.ObjectId(accountId), _isDeleted: { $ne: true } })
        .sort({ dueDate: -1 })

    await disconnect();
    return result;
}
