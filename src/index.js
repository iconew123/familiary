import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import GlobalStyles from "./GlobalStyles";
import { createRoot } from 'react-dom/client';

const theme = extendTheme({
  fonts: {
    heading: "Nanum Gothic Coding, sans-serif",
    body: "Nanum Gothic Coding, sans-serif",
  },
});

const root = createRoot(document.getElementById('root'));
root.render(
  <>
    <ChakraProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ChakraProvider>
  </>
);
