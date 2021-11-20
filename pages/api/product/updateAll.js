import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/Product'

// update all
// filter json data ex: {"name": old_name}
// update {"name": "new_name"}
// child with dot ex: {"author.name": ""}
export default async function handler(req, res) {
    const { method } = req

    if (method !== 'PATCH') return res.status(405).end()

    await dbConnect()

    const { filter, update } = req.body

    try {
        const updateProduct = await Product.updateMany(filter, {
            $set: update
        })

        if (!updateProduct) {
            return res.status(400).json({
                status: 'failure',
                message: 'gagal update product'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'success update product'
        })
    } catch (err) {
        res.status(500).json({ status: 'failure', error: err.message })
    }
}
