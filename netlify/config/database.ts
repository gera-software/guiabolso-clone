import mongoose from 'mongoose';

const mongoUri = process.env.VITE_MONGO_URI ?? ''
 
export function connect() {
    console.log('[connecting] ' + mongoUri)
    return mongoose.connect(mongoUri)
}
 
export function disconnect() {
    console.log('[disconnecting] ' + mongoUri)
    return mongoose.disconnect()
}