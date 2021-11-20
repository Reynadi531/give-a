import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    initialColorMode: 'light',
    useSystemColorMode: false,
    colors: {
        main: {
            100: '#F7DA5B',
            200: '#DEC452',
            300: '#C8B14A',
            400: '#B49F42',
            500: '#A28F3C'
        }
    }
})

export default theme
