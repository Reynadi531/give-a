import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/Product'

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end()

    const { uuid } = req.query

    await dbConnect()

    try {
        const authorProduct = await Product.find({ 'author.uuid': uuid })

        res.status(200).json({
            status: 'success',
            data: authorProduct
        })
    } catch (err) {
        res.status(500).json({ status: 'failure', error: err.message })
    }
}
