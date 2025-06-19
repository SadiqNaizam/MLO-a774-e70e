import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Assuming Sonner is used, if not, it can be removed
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Import Page Components
import Homepage from "./pages/Homepage"; // Assuming a Homepage exists or will be created
import LoginPage from "./pages/LoginPage";
import PasswordResetRequestPage from "./pages/PasswordResetRequestPage";
import RegistrationPage from "./pages/RegistrationPage";
import NotFound from "./pages/NotFound"; // Always Must Include

const queryClient = new QueryClient();

// Simple placeholder for a protected route layout if needed in future
// const ProtectedLayout = () => (
//   <div>
//     {/* Maybe a shared dashboard navbar/sidebar here */}
//     <Outlet />
//   </div>
// );

const App = () => {
  console.log("App.tsx loaded, initializing routes.");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner /> {/* If you use sonner for different style toasts */}
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homepage />} /> {/* Default to Homepage */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/password-reset-request" element={<PasswordResetRequestPage />} />
            
            {/* Example of how protected routes might be structured if needed later */}
            {/* <Route element={<ProtectedLayout />}> */}
            {/*   <Route path="/dashboard" element={<div>Dashboard Page (Protected)</div>} /> */}
            {/* </Route> */}

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Minimal Homepage component if it doesn't exist, for the "/" route to work.
// If you have a real Homepage.tsx, this can be removed from here.
// Create src/pages/Homepage.tsx if it does not exist.
// For this exercise, I will assume Homepage.tsx will be created or exists.
// If src/pages/Homepage.tsx is not part of this request, you would need to create it.
// For now, I am assuming it exists as per the route definition.

export default App;