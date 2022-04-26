import theme from "../styles/theme";
import { ChakraProvider } from "@chakra-ui/provider";
import "@fontsource/cabin/500.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
