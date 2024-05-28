import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ChakraProvider} from "@chakra-ui/react";
// import theme from "./theme";


function App() {
  return (
    <ChakraProvider>
    <div className="App">
      <RouterProvider router={router}/>
    </div>
    </ChakraProvider>
  );
}

export default App;