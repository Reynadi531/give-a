import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
    {
        nameProduct: { type: String, required: true },
        description: { type: String, required: true },
        views: { type: Number, default: 0 },
        thumbnail: { type: String, required: true },
        category: { type: Array, default: [] },
        image: { type: Array, default: [] },
        location: { type: Object, default: {} },
        sosmed: { type: Object, default: {} },
        author: { type: Object, required: true }
    },
    { timestamps: true }
)

module.exports =
    mongoose.models.Product || mongoose.model('Product', ProductSchema)
