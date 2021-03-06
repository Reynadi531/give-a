/* eslint-disable */

import React from 'react'
import {
    Avatar,
    Text,
    Heading,
    Image,
    AspectRatio,
    VStack,
    HStack,
    Container
} from '@chakra-ui/react'
import Link from 'next/link'

function Product({ minW, maxW, author, productName, thumb, desc, photo, id }) {
    return (
        <Link href={id ? `/product/${id}` : '/'} passHref>
            <VStack w="100%" cursor="pointer" minW={minW} maxW={maxW}>
                <Container pos="relative" p={0}>
                    <AspectRatio ratio={1 / 1} w="100%" userSelect="none">
                        <Image
                            src={thumb}
                            rounded="md"
                            alt={productName}
                            pointerEvents="none"
                        />
                    </AspectRatio>
                    <Container
                        pos="absolute"
                        bottom="0"
                        bgColor="rgba(0,0,0,0.4)"
                        rounded="md"
                        p={2}
                        overflowY="hidden"
                    >
                        <Text
                            color="white"
                            fontWeight="bold"
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                textTransform: 'capitalize'
                            }}
                        >
                            {productName}
                        </Text>
                        <Text
                            color="white"
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                textTransform: 'capitalize'
                            }}
                        >
                            {desc}
                        </Text>
                    </Container>
                </Container>
                <HStack w="full" justifyItems="flex-start" py="0.5em">
                    <Avatar size="xs" src={photo} />
                    <Text
                        fontSize="sm"
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            textTransform: 'capitalize'
                        }}
                    >
                        {author}
                    </Text>
                </HStack>
            </VStack>
        </Link>
    )
}

export default Product
