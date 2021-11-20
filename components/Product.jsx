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

function Product(props) {
    return (
        <VStack w="100%" cursor="pointer" {...props}>
            <Container pos="relative" p={0}>
                <AspectRatio ratio={1 / 1} w="100%" userSelect="none">
                    <Image
                        src="https://id-live-05.slatic.net/p/4494148e37b058d0c791d9fd9a59b151.jpg_720x720q80.jpg_.webp"
                        rounded="md"
                        alt="baju"
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
                            textOverflow: 'ellipsis'
                        }}
                    >
                        Baju
                    </Text>
                    <Text
                        color="white"
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        Yep ini adalah sebuah baju
                    </Text>
                </Container>
            </Container>
            <HStack w="full" justifyItems="flex-start" py="0.5em">
                <Avatar size="xs" />
                <Text fontSize="sm">Username</Text>
            </HStack>
        </VStack>
    )
}

export default Product
