import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, ChevronUp, ArrowLeft, BarChart3, Users, Target } from 'lucide-react';
import { DashboardAdvanced } from '@/components/DashboardAdvanced';
import { OperadorExpandibleList } from '@/components/OperadorExpandibleList';

// Mock data para demonstração
const kpiData = {
  paginasTotais: 342,
  gastoMensal: 125000,
  percentualGratuitas: 15
};

const operadoresData = [
  {
    id: '1',
    nome: 'João Silva',
    totalPaginas: 24,
    paginasPagas: 20,
    paginasGratuitas: 4,
    gastoTotal: 15000,
    detalhes: [
      { jornal: 'Football Whispers', pagina: 'Primeira Página', pago: true, valor: 5000 },
      { jornal: 'Football Whispers', pagina: 'Esportes', pago: true, valor: 3500 },
      { jornal: 'Trivela', pagina: 'Copa do Mundo', pago: false, valor: 0 },
      { jornal: 'SportsMole', pagina: 'Premier League', pago: true, valor: 6500 }
    ]
  },
  {
    id: '2',
    nome: 'Maria Santos',
    totalPaginas: 18,
    paginasPagas: 15,
    paginasGratuitas: 3,
    gastoTotal: 12000,
    detalhes: [
      { jornal: 'Vringe', pagina: 'La Liga', pago: true, valor: 4000 },
      { jornal: 'Calcio d\'Angolo', pagina: 'Serie A', pago: true, valor: 4500 },
      { jornal: 'Premier League Brasil', pagina: 'Análises', pago: false, valor: 0 },
      { jornal: 'Um Dois Esportes', pagina: 'Brasileirão', pago: true, valor: 3500 }
    ]
  }
];

const DashboardKPI = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header com botão voltar */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 text-gray-600 hover:text-gray-900 p-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Home
          </Button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl font-bold" style={{ color: 'var(--accent-secondary)' }}>
              NORTH
            </span>
            <span className="text-3xl font-bold" style={{ color: 'var(--accent-primary)' }}>
              STAR
            </span>
            <span className="text-3xl font-bold text-gray-700 ml-2">
              NETWORK
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Dashboard Executivo
          </h1>
          <p className="text-gray-600">
            Análise completa de receita, operadores e oportunidades de negócio
          </p>
        </div>

        {/* Tabs para diferentes visualizações */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="operators" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Operadores
            </TabsTrigger>
          </TabsList>

          {/* Aba Analytics - Dashboard Avançado */}
          <TabsContent value="analytics">
            <DashboardAdvanced />
          </TabsContent>

          {/* Aba Operadores - Nova Lista Expandível */}
          <TabsContent value="operators">
            <OperadorExpandibleList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardKPI;
