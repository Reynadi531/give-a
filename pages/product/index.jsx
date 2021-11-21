import { SimpleGrid } from '@chakra-ui/layout'
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
        axios.get(`/api/product?q=${nama || ''}`).then(({ data }) => {
            setData(data)
        })
    }, [nama])

    return (
        <Main>
            <Header />
            <SimpleGrid spacing={2} p={2} columns={[2, 4, null, 6]}>
                {data &&
                    data.data.map(
                        (
                            {
                                author: { name, photo },
                                description,
                                nameProduct,
                                thumbnail
                            },
                            i
                        ) => {
                            return (
                                <ProductC
                                    author={name}
                                    photo={photo}
                                    desc={description}
                                    productName={nameProduct}
                                    thumb={thumbnail}
                                    key={i}
                                />
                            )
                        }
                    )}
            </SimpleGrid>
        </Main>
    )
}

export default Product
