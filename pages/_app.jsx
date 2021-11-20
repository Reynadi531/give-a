import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@auth0/nextjs-auth0'

import theme from '../theme'

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </ChakraProvider>
    )
}

export default MyApp
