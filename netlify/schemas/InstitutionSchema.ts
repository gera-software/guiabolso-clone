import mongoose from 'mongoose';

export const InstitutionSchema = new mongoose.Schema({
    pluggyConnectorId: Number,
    name: String,
    imageUrl: String,
    primaryColor: String,
});

export default mongoose.model("institutions", InstitutionSchema);
