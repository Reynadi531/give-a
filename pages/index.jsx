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
import { FiSearch, FiKey, FiLogOut, FiUser } from 'react-icons/fi'
import { useUser } from '@auth0/nextjs-auth0'
import Product from '../components/Product'

export default function Home() {
    const { user, isLoading } = useUser()
    if (isLoading) return null

    const uploadHandler = () => {
        if (!user) return (location.href = '/api/auth/login')
    }

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
                <Button
                    colorScheme="yellow"
                    color="white"
                    onClick={uploadHandler}
                    rounded="full"
                >
                    +
                </Button>
                <Menu>
                    <MenuButton
                        as={Avatar}
                        aria-label="Profile"
                        size="md"
                        src={user?.picture}
                    />
                    <MenuList>
                        {!user ? (
                            <MenuItem
                                icon={<FiKey />}
                                as={'a'}
                                href="/api/auth/login"
                            >
                                Login
                            </MenuItem>
                        ) : (
                            <>
                                <MenuItem icon={<FiUser />}>Profile</MenuItem>
                                <MenuItem
                                    icon={<FiLogOut />}
                                    as={'a'}
                                    href="/api/auth/logout"
                                >
                                    Logout
                                </MenuItem>
                            </>
                        )}
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
                <Product minW="200px" />
                <Product minW="200px" />
                <Product minW="200px" />
                <Product minW="200px" />
            </HStack>
            <SimpleGrid
                columns={[1, 2, 5]}
                spacing={3}
                px={4}
                my="1em"
                overflow="auto"
            >
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </SimpleGrid>
            <Container centerContent my={6}>
                <Button colorScheme="yellow" color="white">
                    See more
                </Button>
            </Container>
        </Main>
    )
}
