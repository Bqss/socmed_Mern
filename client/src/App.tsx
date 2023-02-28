import { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { RouterProvider } from "react-router-dom";
import { route } from "./routes";
import {MantineProvider} from "@mantine/core"

const client = new QueryClient();

function App() {
  return (
    <div className="App bg-background min-h-screen  w-full">
      <MantineProvider>
        <QueryClientProvider client={client}>
          <RouterProvider router={route} />
        </QueryClientProvider>
      </MantineProvider>
    </div>
  );
}

export default App;
