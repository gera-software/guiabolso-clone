import { Schema, InferSchemaType, model } from 'mongoose';


const schema = new Schema({
    pluggyConnectorId: { type: Number, required: false },
    name: String,
    imageUrl: { type: String, required: false },
    primaryColor: { type: String, required: false },
});

// export const InstitutionSchema = new mongoose.Schema({
//     pluggyConnectorId: Number,
//     name: String,
//     imageUrl: String,
//     primaryColor: String,
// });
export type Institution =  InferSchemaType<typeof schema>;


const InstitutionModel = model<Institution>('institutions', schema);

export default InstitutionModel

// export default mongoose.model("institutions", InstitutionSchema);
