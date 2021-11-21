import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { GridItem, SimpleGrid } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import axios from 'axios'
import Main from '../components/layout/Main'
import Header from '../components/index/Header'

function Post() {
    const { user } = useUser()

    useEffect(() => {
        if (!user) return null
    }, [user])

    const submitHandler = e => {
        e.preventDefault()
        const { nama, deskripsi, thumb } = e.target
        const reader = new FileReader()
        reader.readAsDataURL(thumb.files[0])
        reader.onload = () => {
            axios
                .post(`/api/product`, {
                    nameProduct: nama.value,
                    description: deskripsi.value,
                    thumbnail: reader.result,
                    author: {
                        name: user?.given_name,
                        photo: user?.picture
                    }
                })
                .then(res => console.log(res))
        }
    }

    return (
        <Main>
            <Header />
            <SimpleGrid
                spacing={4}
                columns={[1, 2]}
                p={4}
                as="form"
                onSubmit={submitHandler}
            >
                <GridItem>
                    <FormControl isRequired>
                        <FormLabel>Nama produk</FormLabel>
                        <Input
                            placeholder="baju bayi, celana..."
                            name="nama"
                            autoComplete="off"
                        />
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl isRequired>
                        <FormLabel>Deskripsi</FormLabel>
                        <Input
                            placeholder="baju bayi, celana..."
                            name="deskripsi"
                            autoComplete="off"
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[0, 2]}>
                    <FormControl isRequired>
                        <FormLabel>Deskripsi</FormLabel>
                        <Input type="file" accept="image/*" name="thumb" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[0, 2]}>
                    <Button
                        type="submit"
                        w="full"
                        colorScheme="yellow"
                        color="white"
                    >
                        Post
                    </Button>
                </GridItem>
            </SimpleGrid>
        </Main>
    )
}

export default withPageAuthRequired(Post)
