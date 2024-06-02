import { Global } from "@emotion/react";

const GlobalStyles = () => (
    <Global
      styles={`
        @import url('https://fonts.googleapis.com/css2?family=Gaegu&family=Nanum+Gothic&family=Nanum+Gothic+Coding&display=swap');
        
        .nanum-gothic-regular {
            font-family: "Nanum Gothic", sans-serif;
            font-weight: 400;
            font-style: normal;
          }
        `}
    />
  );

  export default GlobalStyles;