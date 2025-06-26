
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  const [expandedOperadores, setExpandedOperadores] = useState<string[]>([]);

  const toggleOperador = (operadorId: string) => {
    setExpandedOperadores(prev =>
      prev.includes(operadorId)
        ? prev.filter(id => id !== operadorId)
        : [...prev, operadorId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
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
            Dashboard
          </h1>
          <p className="text-gray-600">
            Visão geral dos KPIs e gestão de operadores
          </p>
        </div>

        {/* Cards KPI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">Páginas Totais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" style={{ color: 'var(--accent-primary)' }}>
                {kpiData.paginasTotais}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">Gasto Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" style={{ color: 'var(--accent-secondary)' }}>
                R$ {(kpiData.gastoMensal / 1000).toFixed(0)}k
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">% Gratuitas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-700">
                {kpiData.percentualGratuitas}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acordeões de Operadores */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Gestão de Operadores</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {operadoresData.map((operador) => (
              <div key={operador.id} className="p-6">
                {/* Cabeçalho do Acordeão */}
                <Button
                  variant="ghost"
                  className="w-full p-0 h-auto hover:bg-transparent"
                  onClick={() => toggleOperador(operador.id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-6 text-left">
                      <div className="font-semibold text-gray-900">{operador.nome}</div>
                      <div className="text-sm text-gray-600">
                        {operador.totalPaginas} páginas
                      </div>
                      <div className="text-sm text-green-600">
                        {operador.paginasPagas} pagas
                      </div>
                      <div className="text-sm text-gray-500">
                        {operador.paginasGratuitas} gratuitas
                      </div>
                      <div className="text-sm font-medium" style={{ color: 'var(--accent-primary)' }}>
                        R$ {(operador.gastoTotal / 1000).toFixed(0)}k total
                      </div>
                    </div>
                    {expandedOperadores.includes(operador.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </Button>

                {/* Conteúdo Expandido */}
                {expandedOperadores.includes(operador.id) && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 text-gray-700">Jornal</th>
                          <th className="text-left py-2 text-gray-700">Página</th>
                          <th className="text-left py-2 text-gray-700">Pago?</th>
                          <th className="text-left py-2 text-gray-700">Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {operador.detalhes.map((detalhe, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-2 text-gray-900">{detalhe.jornal}</td>
                            <td className="py-2 text-gray-600">{detalhe.pagina}</td>
                            <td className="py-2">
                              {detalhe.pago ? (
                                <span className="text-green-600 font-medium">✓ Sim</span>
                              ) : (
                                <span className="text-gray-500">Gratuito</span>
                              )}
                            </td>
                            <td className="py-2 font-medium">
                              {detalhe.valor > 0 ? `R$ ${detalhe.valor.toLocaleString()}` : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardKPI;
