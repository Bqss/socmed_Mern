import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import store from "./store";
import ReactQueryClientProvider from "./providers/ReactQueryClientProvider";
import { ChatPage, Home, Login, MyProfile, Register } from "./pages";
import MainLayout from "./layout/AuthedLayout";
import ChatLayout from "./layout/ChatLayout";
import BlankChats from "./components/atoms/BlankChats";
import Chats from "./components/organism/Chats";

function App() {
  return (
    <div className="App  bg-background min-h-screen  w-full">
      <Provider store={store}>
        <MantineProvider>
          <BrowserRouter>
            <ReactQueryClientProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<MainLayout />}>
                  <Route path="" element={<Home />} />
                  <Route path="/:userId" element={<MyProfile />} />
                </Route>
                <Route path="/" element={<ChatLayout />}>
                  <Route path="chat" element={<BlankChats/>} />
                  <Route path="chat/:chatId" element={<Chats/>} />
                </Route>
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
