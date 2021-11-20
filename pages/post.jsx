import { useUser } from '@auth0/nextjs-auth0'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { SimpleGrid } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import axios from 'axios'

function Post() {
    const { user } = useUser()

    useEffect(() => {
        if (!user) return null
    }, [user])

    const submitHandler = e => {
        e.preventDefault()
        const { nama, deskripsi, thumb } = e.target
        axios
            .post(
                `${
                    process.env.PROD_URL || 'http://localhost:3000'
                }/api/product`,
                {
                    nameProduct: nama.value,
                    description: deskripsi.value,
                    thumbnail: thumb.files[0],
                    author: {
                        name: user?.given_name,
                        photo: user?.picture
                    }
                }
            )
            .then(res => console.log(res))
    }

    return (
        <SimpleGrid spacing={4} columns={2} as="form" onSubmit={submitHandler}>
            <FormControl isRequired>
                <FormLabel>Nama produk</FormLabel>
                <Input placeholder="baju bayi, celana..." name="nama" />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Deskripsi</FormLabel>
                <Input placeholder="baju bayi, celana..." name="deskripsi" />
            </FormControl>
            <FormControl isRequired colSpan={2}>
                <FormLabel>Deskripsi</FormLabel>
                <Input type="file" accept="image/*" name="thumb" />
            </FormControl>
            <Button type="submit">Post</Button>
        </SimpleGrid>
    )
}

export default Post
