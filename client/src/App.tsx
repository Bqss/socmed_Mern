import { BrowserRouter, Route,  Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import store from "./store";
import ReactQueryClientProvider from "./providers/ReactQueryClientProvider";
import { Home, Login, Register } from "./pages";

function App() {
  return (
    <div className="App  bg-background min-h-screen  w-full">
      <Provider store={store}>
        <MantineProvider>
          <BrowserRouter>
            <ReactQueryClientProvider>
              <Routes>
                <Route path="/login" element={<Login/>}  />
                <Route path="/register" element={<Register/>}  />
                <Route path="/" element={<Home/>}/>
              </Routes>
            </ReactQueryClientProvider>
          </BrowserRouter>
        </MantineProvider>
      </Provider>
    </div>
  );
}


// <ReactQueryClientProvider>
//             {/* <RouterProvider router={route} /> */}
//           </ReactQueryClientProvider>

export default App;
