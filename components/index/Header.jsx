import { IconButton } from '@chakra-ui/button'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { HStack } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { FiSearch, FiKey, FiLogOut, FiUser, FiPlus } from 'react-icons/fi'
import { useUser } from '@auth0/nextjs-auth0'
import { Avatar } from '@chakra-ui/avatar'
import React from 'react'

function Header() {
    const { user } = useUser()

    const uploadHandler = () => {
        if (!user) return (location.href = '/api/auth/login')
    }

    return (
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
            <IconButton
                colorScheme="yellow"
                color="white"
                onClick={uploadHandler}
                rounded="full"
                icon={<FiPlus />}
            />
            <Menu>
                <MenuButton
                    as={Avatar}
                    aria-label="Profile"
                    size="md"
                    src={user?.picture}
                    cursor="pointer"
                    userSelect="none"
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
    )
}

export default Header
