import Main from '../components/layout/Main'
import {
    Container,
    Button,
    Text,
    Heading,
    HStack,
    VStack,
    Image,
    Box,
    SimpleGrid
} from '@chakra-ui/react'

import { useUser } from '@auth0/nextjs-auth0'
import Product from '../components/Product'
import Header from '../components/index/Header'
import axios from 'axios'

export default function Home({ data }) {
    const { user } = useUser()
    return (
        <Main>
            <Header />
            <HStack
                px={[2, 12]}
                flexDir={['column-reverse', null, 'row']}
                py={4}
            >
                <Image
                    src="/assets/hero.svg"
                    alt="hero"
                    maxW="xs"
                    pointerEvents="none"
                />
                <VStack align="flex-start">
                    {user && (
                        <Box>
                            <Text>Welcome back {user?.given_name},</Text>
                        </Box>
                    )}
                    <Heading color="teal">
                        Untuk ku, untuk mu, memberi dan mencari barang gratis.
                    </Heading>
                </VStack>
            </HStack>
            <HStack spacing={3} px={4} my="1em" overflow="auto">
                {data.length > 0 &&
                    data
                        .slice(0, 4)
                        .map(
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
                                    <Product
                                        minW="200px"
                                        author={name}
                                        desc={description}
                                        productName={nameProduct}
                                        thumb={thumbnail}
                                        key={i}
                                    />
                                )
                            }
                        )}
            </HStack>
            <SimpleGrid
                columns={[1, 2, 5]}
                spacing={3}
                px={4}
                my="1em"
                overflow="auto"
            >
                {data.length > 0 &&
                    data
                        .slice(0, 10)
                        .map(
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
                                    <Product
                                        minW="200px"
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
            <Container centerContent my={6}>
                <Button colorScheme="yellow" color="white">
                    See more
                </Button>
            </Container>
        </Main>
    )
}
export async function getServerSideProps() {
    const { data } = await axios.get(
        `${process.env.PROD_URL || 'http://localhost:3000'}/api/product`
    )
    return {
        props: data
    }
}
