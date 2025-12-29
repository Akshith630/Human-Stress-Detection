import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DataInfo from "./pages/DataInfo";
import Detection from "./pages/Detection";
import HabitTracker from "./pages/HabitTracker";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Use HashRouter when served from file:// (packaged Electron) so routes resolve correctly. */}
      {typeof window !== "undefined" && window.location.protocol === "file:" ? (
        <HashRouter>
          <Navigation />
          <Routes>
            {/* HashRouter keeps the path after the # and works with file:// URLs */}
            <Route path="/" element={<Home />} />
            <Route path="/data-info" element={<DataInfo />} />
            <Route path="/detection" element={<Detection />} />
            <Route path="/habit-tracker" element={<HabitTracker />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      ) : (
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data-info" element={<DataInfo />} />
            <Route path="/detection" element={<Detection />} />
            <Route path="/habit-tracker" element={<HabitTracker />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
