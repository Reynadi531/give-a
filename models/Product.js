import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
    {
        nameProduct: { type: String, required: true },
        description: { type: String, required: true },
        views: { type: Number, required: true, default: 0 },
        thumbnail: { type: String, required: true },
        category: { type: Array, required: true },
        image: { type: Array, required: true },
        location: { type: Object, required: true },
        sosmed: { type: Object, required: true },
        author: { type: Object, required: true }
    },
    { timestamps: true }
)

module.exports =
    mongoose.models.Product || mongoose.model('Product', ProductSchema)
