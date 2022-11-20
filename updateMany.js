import mongoose from 'mongoose';
import { Schema, model, Types } from 'mongoose';

//local
// const mongoUri = 'mongodb://localhost:27017/development_guiabolso'

//atlas development
// const mongoUri = 'mongodb+srv://guiabolso:8DdBa34fw6bR3dbR@cluster0.xzm8za1.mongodb.net/development_guiabolso'

//atlas producao
const mongoUri = 'mongodb+srv://guiabolso:8DdBa34fw6bR3dbR@cluster0.xzm8za1.mongodb.net/production_guiabolso'


const transactionSchema = new Schema({
    pluggyTransactionId: { type: String, required: false },
    description: String,
    amount: Number,
    currencyCode: String,
    date: Date,
    category: {
        _id: Types.ObjectId,
        name: String,
        iconName: String,
        primaryColor: String
    },
    type: String,
    syncType: String,
    status: String,
    comment: { type: String, required: false },
    ignored: Boolean,
    accountId: Types.ObjectId,
    userId: Types.ObjectId,
    _isDeleted: Boolean,
});

const TransactionModel = model('transactions', transactionSchema);

console.log('[Mongo] connecting... ' + mongoUri)
await mongoose.connect(mongoUri)

const res1 = await TransactionModel.updateMany({ }, { $set: {syncType: 'AUTOMATIC'} });
console.log(res1)

const res2 = await TransactionModel.updateMany({accountId: new Types.ObjectId('636823189563690bc4494cc8')}, { $set: {syncType: 'MANUAL'} });
console.log(res2)

console.log('[Mongo] disconnecting... ' + mongoUri)
await mongoose.disconnect()
