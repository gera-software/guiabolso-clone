import { Handler } from "@netlify/functions";
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  accountId: mongoose.SchemaTypes.ObjectId,
  date: Date,
  description: String,
  value: Number,
  categoryId: mongoose.SchemaTypes.ObjectId,
  comment: String,
});

const Transaction = mongoose.model('transactions', TransactionSchema);

const mongoUri = process.env.VITE_MONGO_URI || 'mongodb://localhost:27017/guiabolso'

const handler :Handler = async (event, context) => {
  console.log('[connecting] ' + mongoUri)
  await mongoose.connect(mongoUri);
  
  const year = event.queryStringParameters?.year
  const month = event.queryStringParameters?.month


  // const transactions = await Transaction.find({ _id: "63682d7c90a6d4bf4c5ac6a3" });
  const transactions = await Transaction.aggregate([
    // { $match: { _id: new mongoose.Types.ObjectId("63682d7c90a6d4bf4c5ac6a3") } },
    { $match: { date: { $gte: new Date(`${year}-${month}-01`), $lt: new Date(`${year}-${month}-28`) } } },
    { $lookup: { from: 'accounts', localField: 'accountId', foreignField: '_id', as: 'account' } },
    { $lookup: { from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category' } },
  ]);

  
  return {
    statusCode: 200,
    body: JSON.stringify(transactions),
  };
};

export { handler };