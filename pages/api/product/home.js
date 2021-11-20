import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/Product'

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end()

    await dbConnect()

    try {
        const mostView = await Product.find({}).sort({ views: -1 }).limit(6)
        const newPost = await Product.find({}).sort({ createdAt: -1 }).limit(6)

        const showInHome = {
            populer: mostView,
            latest: newPost
        }

        res.status(200).json({
            status: 'success',
            data: showInHome
        })
    } catch (err) {
        res.status(500).json({ status: 'failure', error: err.message })
    }
}
