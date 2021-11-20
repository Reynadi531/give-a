import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/Product'

export default async function handler(req, res) {
    const { method } = req
    const { id } = req.query

    await dbConnect()
    switch (method) {
        // get spasific product
        case 'GET':
            try {
                const data = await Product.findById(id)

                if (!data) {
                    return res.status(404).json({
                        status: 'failure',
                        message: 'product tidak ada'
                    })
                }

                res.status(200).json({
                    status: 'success',
                    data
                })
            } catch (err) {
                res.status(500).json({ status: 'failure', error: err.message })
            }
            break

        // update
        // json data {"name": ..., "value": ...}
        case 'PATCH':
            try {
                const updateProduct = await Product.findByIdAndUpdate(id, {
                    $set: req.body
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
            break

        // delete
        case 'DELETE':
            try {
                const deleteProduct = await Product.findByIdAndDelete(id)

                if (!deleteProduct) {
                    return res.status(400).json({
                        status: 'failure',
                        message: 'gagal hapus product'
                    })
                }

                res.status(200).json({
                    status: 'success',
                    message: 'success hapus product'
                })
            } catch (err) {
                res.status(500).json({ status: 'failure', error: err.message })
            }
            break
        default:
            res.status(405).end()
            break
    }
}
