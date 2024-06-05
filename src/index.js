import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import GlobalStyles from "./GlobalStyles"; // 글로벌 스타일을 임포트합니다
import { createRoot } from 'react-dom/client';

// 커스텀 테마 설정
const theme = extendTheme({
  fonts: {
    heading: "Nanum Gothic Coding, sans-serif", // 필요에 따라 추가
    body: "Nanum Gothic Coding, sans-serif", // 필요에 따라 추가
  },
});

const root = createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <GlobalStyles /> 
    <App />
  </ChakraProvider>
);
