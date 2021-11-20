import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/Product'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        // add product
        // json data {...: ..., ...: ...}
        case 'POST':
            try {
                const product = await new Product(req.body)
                const saveProduct = await product.save()

                if (!saveProduct) {
                    return res.status(400).json({
                        status: 'failure',
                        message: 'gagal menambah product'
                    })
                }

                res.status(201).json({ status: 'success', data: saveProduct })
            } catch (err) {
                res.status(500).json({ status: 'failure', error: err.message })
            }
            break

        // get all product or with query
        case 'GET':
            try {
                const { category, fcity, ob, q, page } = req.query
                const queryObj = {}
                let sort = {}
                const pageSize = 10
                let skips = 0

                if (page === undefined) {
                    skips = 0
                } else {
                    skips = pageSize * (page - 1)
                }

                if (q !== undefined) {
                    queryObj['$or'] = [
                        { nameProduct: new RegExp(q, 'gi') },
                        { description: new RegExp(q, 'gi') }
                    ]
                }

                if (ob !== undefined) {
                    if (ob == 'views') {
                        sort = { views: -1 }
                    }
                }

                if (category !== undefined) {
                    queryObj['category'] = category
                }

                if (fcity !== undefined) {
                    const idLocation = fcity.split(',').map(loc => {
                        return Number(loc)
                    })

                    queryObj['location.kabupaten.id'] = idLocation
                }

                const data = await Product.find({
                    $and: [queryObj]
                })
                    .sort(sort)
                    .skip(skips)
                    .limit(pageSize)

                res.status(200).json({ status: 'success', data })
            } catch (err) {
                res.status(500).json({ status: 'failure', error: err.message })
            }
            break
        default:
            res.status(405).end()
            break
    }
}
