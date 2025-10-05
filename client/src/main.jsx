<<<<<<< HEAD
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./Providers/AuthProvider";
import { router } from "./Routes/Routes";
=======
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import AuthProvider from "./Providers/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className="max-w-screen-xl mx-auto">
            <RouterProvider router={router} />
          </div>
          <Toaster />
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
