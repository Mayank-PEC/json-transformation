import mongoose from "mongoose";

const transformSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        originalname: {
            type: String,
            required: true
        },
        mimetype: {
            type: String,
            required: true
        },
        filename: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        }


    },
    { timestamps: true }
);

const Transform = mongoose.model("Transform", transformSchema);

export default Transform;