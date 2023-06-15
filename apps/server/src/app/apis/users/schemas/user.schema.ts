import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true,
        min: [8, 'Please enter password at least 8 characters.'],
        max: [32, 'Please enter password no more than 32 characters.']
    },
    role: {
        type: String,
        required: true
    }
});