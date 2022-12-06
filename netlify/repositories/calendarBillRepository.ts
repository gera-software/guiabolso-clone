import { model, Schema, Types } from "mongoose";
import { connect, disconnect } from "../config/database";
import { CalendarBill } from "../types";

const schema = new Schema<CalendarBill>({
    dueDate: Date,
    description: String,
    amount: Number,
    status: String,
    type: String,
    userId: Types.ObjectId,
    _isDeleted: Boolean,
});

const CalendarBillModel = model<CalendarBill>('bills', schema);

export async function fetchByUser(id, monthField, yearField): Promise<CalendarBill[]> {
    await connect();

    const year = parseInt(yearField)
    const month = parseInt(monthField)

    const firstDay = new Date(`${year}-${month}-01`)
    const lastDay = (month === 12) ? ( new Date(`${year + 1}-01-01`) ) : ( new Date(`${year}-${month + 1}-01`) )

    console.log(id, firstDay, lastDay)
    const result = await CalendarBillModel.find({ userId: new Types.ObjectId(id), _isDeleted: { $ne: true }, dueDate: { $gte: firstDay, $lt: lastDay } })

    await disconnect();
    return result;
}