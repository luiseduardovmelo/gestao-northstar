import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardKPI from "./pages/DashboardKPI";
import PaginasJornal from "./pages/PaginasJornal";
import GestaoOperadores from "./pages/GestaoOperadores";
import OperadorDetail from "./pages/OperadorDetail";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

import { DataProvider } from "./context/DataContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <DataProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardKPI /></ProtectedRoute>} />
              <Route path="/jornal/:jornalId/paginas" element={<ProtectedRoute><PaginasJornal /></ProtectedRoute>} />
              <Route path="/jornal/:jornalId/pagina/:paginaId/operadores" element={<ProtectedRoute><GestaoOperadores /></ProtectedRoute>} />
              <Route path="/operador/:operadorName" element={<ProtectedRoute><OperadorDetail /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
