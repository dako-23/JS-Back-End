import { Schema, model, Types } from "mongoose";

const DeviceSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true,
    },
    'hard-disk': {
        type: String,
        required: true,
    },
    'screen-size': {
        type: String,
        required: true,
    },
    ram: {
        type: String,
        required: true,
    },
    'operating-system': {
        type: String,
        required: true,
    },
    cpu: {
        type: String,
        required: true,
    },
    gpu: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    preferredList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Device = model('Device', DeviceSchema);

export default Device;