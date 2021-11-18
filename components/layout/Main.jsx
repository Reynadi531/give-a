import Head from 'next/head'
import { Box } from '@chakra-ui/react'

const Main = ({ children }) => {
    return (
        <div>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="description" content="Tempatnya barang gratis!" />
                <meta name="author" content="Cuyhub team" />
                <title>GIVE-A</title>
            </Head>
            <Box>{children}</Box>
        </div>
    )
}

export default Main
