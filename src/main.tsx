import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ActiveIdContextProvider } from "./context/ActiveIdContextProvider";
import { BookmarksContextProvider } from "./context/BookmarksContextProvider";
import SearchContextProvider from "./context/SearchContextProvider.tsx";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchContextProvider>
        <ActiveIdContextProvider>
          <BookmarksContextProvider>
            <App />
          </BookmarksContextProvider>
        </ActiveIdContextProvider>
      </SearchContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
