import { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { RouterProvider } from "react-router-dom";
import { route } from "./routes";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import store from "./store";

const client = new QueryClient();

function App() {
  return (
    <div className="App  bg-background min-h-screen  w-full">
      <Provider store={store} >
        <MantineProvider>
          <QueryClientProvider client={client}>
            <RouterProvider router={route} />
          </QueryClientProvider>
        </MantineProvider>
      </Provider>
    </div>
  );
}

export default App;
