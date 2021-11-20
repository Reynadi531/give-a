import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Main from '../../components/layout/Main'
import {
    Container,
    Text,
    Button,
    Spacer,
    Flex,
    Box,
    Center,
    Avatar,
    VStack,
    HStack,
    Divider,
    SimpleGrid
} from '@chakra-ui/react'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import Product from '../../components/Product'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)



export default withPageAuthRequired(function Profile({ user })  {
    const { data , error } = useSWR('/api/product', fetcher)
    const router = useRouter()
    console.log(data)
    
    return (
        <>
            {!error ? (
                <Main>
                    <Container my="4" maxW="container.xl">
                        <Flex>
                            <Box>
                                <Button
                                    rounded="2xl"
                                    size="md"
                                    backgroundColor="main.100"
                                >
                                    <AiOutlinePlus />
                                </Button>
                            </Box>
                            <Spacer />
                            <Box>
                                <Button
                                    rounded="2xl"
                                    size="md"
                                    backgroundColor="main.100"
                                >
                                    <AiOutlineSearch />
                                </Button>
                            </Box>
                        </Flex>
                        <Center my="4">
                            <VStack spacing='6'>
                                <VStack>
                                    <Avatar size="2xl" src={user.picture} />
                                    <Text fontSize="xl" fontWeight="medium">
                                        {user.nickname}
                                    </Text>
                                </VStack>
                                <HStack spacing="12">
                                    <VStack>
                                        <Text>Product</Text>
                                        <Text color="gray.400">0</Text>
                                    </VStack>
                                    <Divider orientation="vertical" />
                                    <VStack>
                                        <Text>Followers</Text>
                                        <Text color="gray.400">0</Text>
                                    </VStack>
                                </HStack>

                                <HStack>
                                    <SimpleGrid columns={3} spacing='6'>
                                        {data ? <Products data={data.data}/> : <></> }
                                    </SimpleGrid>
                                </HStack>
                            </VStack>
                        </Center>
                    </Container>
                </Main>
            ) : (
                router.push('/404')
            )}
        </>
    )
})

const Products = ({ data }) => {
    return (
        <>
            {data &&
                data.map(
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
                                productName={
                                    nameProduct
                                }
                                thumb={thumbnail}
                                key={i}
                            />
                        )
                    }
                )}
        </>
    )
}