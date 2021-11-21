/* eslint-disable */

import { useRouter } from 'next/router'
import axios from 'axios'
import useSWR from 'swr'
import Header from '../../components/index/Header'

import {
    Container,
    Box,
    Text,
    VStack,
    HStack,
    Button,
    Image,
    Avatar,
    Tag,
    TagLabel
 } from '@chakra-ui/react' 
 import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineEye } from 'react-icons/ai'
 import { GoLocation } from 'react-icons/go'
 import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
 import Link from 'next/link'

 import { useState } from 'react'

const fetcher = url => axios.get(url).then(res => res.data)

const Detail = () => {
    const router = useRouter()
    const { id } = router.query 
    const { data, error } = useSWR(`/api/product/${id}`, fetcher)
    

    return (
        <>
            {!error ? <>
                <Header />
                { data ? <Product data={data.data} /> : <></> }
            </> : <></>}
        </>
    )
}

const Product = ({ data }) => {
    const [currentImage, setCurrentImage] = useState(0)
    let images = [data.thumbnail, ...data.image];

    const LeftButton = () => {
        if(currentImage == 0) return
        setCurrentImage(currentImage - 1)
    }

    const RightButton = () => {
        if((currentImage + 1) == images.length) return
        setCurrentImage(currentImage + 1)
    }

    let loaded = images.map(e => <Image src={e} />)

    return (
        <>
            <Container my='4' maxW='container.xl' >
                <HStack spacing='6'>
                    <Box alignContent='center' alignItems='center'>
                        <VStack>
                            <Box size='xl'>
                                {loaded[currentImage]}
                            </Box>
                            <HStack>
                                <Button onClick={LeftButton} rounded='xl'><AiOutlineArrowLeft /></Button>
                                <Text>{currentImage + 1}/{images.length}</Text>
                                <Button onClick={RightButton} rounded='xl'><AiOutlineArrowRight /></Button>
                            </HStack>
                        </VStack>
                    </Box>
                    <Box h='full'>
                        <Container maxW='container.sm'>
                            <Text fontWeight='medium' fontSize='xl'>{data.nameProduct}</Text>
                            <Link passHref href={`/profile/${data.author.uuid}`}>
                                <Button my='2' size='sm' rounded='xl' leftIcon={<Avatar size='xs' src={data.author.photo} />}>
                                    <Text fontWeight='medium' fontSize='sm'>{data.author.name}</Text>
                                </Button>
                            </Link>
                            <HStack my='2'>
                                {(data.category).map((e) => (
                                    <Tag size='sm' variant="solid">
                                        {e}
                                    </Tag>
                                ))}
                            </HStack>
                            <Text fontSize='sm'>{data.description}</Text>
                            <HStack my='4'>
                                <Tag size='md'>
                                    <Box mx='1'>
                                        <AiOutlineEye/>
                                    </Box>
                                    <TagLabel>{data.views}</TagLabel>
                                </Tag>
                                <Tag size='md'>
                                    <Box mx='1'>
                                        <GoLocation />
                                    </Box>
                                    <TagLabel>{data.location.kabupaten.name}, {data.location.provinsi.name}</TagLabel>
                                </Tag>
                            </HStack>
                            <Text my='4' fontWeight='medium' fontSize='lg'>Contact Person</Text>
                            <HStack spacing='6'>
                                <Link href={`https://wa.me/${data.sosmed.whatsapp}`} passHref>
                                    <Button color='white' backgroundColor='green.400' size='lg' leftIcon={<FaWhatsapp />}> Whatsapp</Button>
                                </Link>
                                <Link href={`https://instagram.com/${data.sosmed.instagram}`} passHref>
                                    <Button color='white' backgroundColor='pink.500' size='lg' leftIcon={<FaInstagram />}>Instagram</Button>
                                </Link>
                            </HStack>
                        </Container>

                    </Box>
                </HStack>
            </Container>
        </>
    )
}

export default Detail