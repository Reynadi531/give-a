import Head from 'next/head'

const Main = ({ children }) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="description" content="Tempatnya barang gratis!" />
                <meta name="author" content="Cuyhub team" />
                <title>GIVE-A</title>
            </Head>
            {children}
        </>
    )
}

export default Main
