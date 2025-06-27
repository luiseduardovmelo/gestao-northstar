
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LogProvider } from "@/contexts/LogContext";
import Dashboard from "./pages/Dashboard";
import DashboardKPI from "./pages/DashboardKPI";
import Configuracoes from "./pages/Configuracoes";
import PaginasJornal from "./pages/PaginasJornal";
import GestaoOperadores from "./pages/GestaoOperadores";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LogProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<DashboardKPI />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/jornal/:jornalId/paginas" element={<PaginasJornal />} />
            <Route path="/jornal/:jornalId/pagina/:paginaId/operadores" element={<GestaoOperadores />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LogProvider>
  </QueryClientProvider>
);

export default App;
