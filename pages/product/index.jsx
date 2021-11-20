import { Stack } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../../components/index/Header'
import Main from '../../components/layout/Main'
import ProductC from '../../components/Product'
import axios from 'axios'

function Product() {
    const router = useRouter()
    const [data, setData] = useState(null)
    const { nama } = router.query

    useEffect(() => {
        axios
            .get(
                `${
                    process.env.PROD_URL || 'http://localhost:3000'
                }/api/product?q=${nama || ''}`
            )
            .then(({ data }) => {
                setData(data)
            })
    }, [nama])

    return (
        <Main>
            <Header />
            <Stack spacing={2} direction="row" p={2}>
                {data &&
                    data.data.map(
                        (
                            {
                                author: { name },
                                description,
                                nameProduct,
                                thumbnail
                            },
                            i
                        ) => {
                            return (
                                <ProductC
                                    maxW="200px"
                                    author={name}
                                    desc={description}
                                    productName={nameProduct}
                                    thumb={thumbnail}
                                    key={i}
                                />
                            )
                        }
                    )}
            </Stack>
        </Main>
    )
}

export default Product
