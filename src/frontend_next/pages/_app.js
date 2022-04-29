import theme from "../styles/theme";
import { ChakraProvider } from "@chakra-ui/provider";
import "@fontsource/cabin/500.css";
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>DNATrain - Hanarebanare no machi o tsunagu ressha wa itte shimatta ne</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default MyApp;
