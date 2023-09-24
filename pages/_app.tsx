import type { AppProps } from 'next/app';
import Layout from '../app/components/Layout/Layout';
import { ChakraProvider } from '@chakra-ui/react';
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <Component { ...pageProps } />
      </Layout>
    </ChakraProvider>
  )
};
