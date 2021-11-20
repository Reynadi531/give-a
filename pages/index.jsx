/* eslint-disable */

import Main from '../components/layout/Main'
import {
    Container,
    Input,
    FormControl,
    Button,
    Text,
    InputGroup,
    InputLeftElement,
    Heading,
    HStack,
    VStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
    Image,
    Box,
    SimpleGrid
} from '@chakra-ui/react'
import { FiSearch, FiKey } from 'react-icons/fi'
import { useState } from 'react'
import Product from '../components/Product'

export default function Home() {
    const [logged, setLogged] = useState(true)
    return (
        <Main>
            <HStack px={[2, 16]} py={4} spacing={[2, 6]}>
                <InputGroup>
                    <InputLeftElement pointerEvents="none" rounded="full">
                        <FiSearch />
                    </InputLeftElement>
                    <Input
                        placeholder="Baju anak, daster, topi ....."
                        borderRadius={['sm', 'full']}
                    />
                </InputGroup>
                <Button colorScheme="yellow" color="white">
                    Upload
                </Button>
                <Menu>
                    <MenuButton as={Avatar} aria-label="Profile" size="md" />
                    <MenuList>
                        <MenuItem icon={<FiKey />}>Login</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
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
                    {logged && (
                        <Box>
                            <Text>Welcome back User,</Text>
                        </Box>
                    )}
                    <Heading color="teal">
                        Untuk ku, untuk mu, memberi dan mencari barang gratis.
                    </Heading>
                </VStack>
            </HStack>
            <SimpleGrid columns={[1, 4]} spacing={3} px={4} my="1rem">
                <Product />
                <Product />
                <Product />
                <Product />
            </SimpleGrid>
            <SimpleGrid columns={[1, 5]} spacing={3} px={4} my="1rem">
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </SimpleGrid>
            <Container centerContent my={6}>
                <Button colorScheme="yellow">See more</Button>
            </Container>
        </Main>
    )
}
