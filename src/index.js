import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import GlobalStyles from "./GlobalStyles"; // 글로벌 스타일을 임포트합니다


// 커스텀 테마 설정
const theme = extendTheme({
  fonts: {
    heading: "Nanum Gothic Coding, sans-serif", // 필요에 따라 추가
    body: "Nanum Gothic Coding, sans-serif", // 필요에 따라 추가
  },
});

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <GlobalStyles /> {/* 글로벌 스타일을 적용합니다 */}
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  // </React.StrictMode>
);