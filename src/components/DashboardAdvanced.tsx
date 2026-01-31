import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Target, DollarSign, Users, AlertCircle } from 'lucide-react';
import { TopPerformers } from '@/components/TopPerformers';
import { useData } from '@/context/DataContext';

export const DashboardAdvanced = () => {
  const { jornais, paginas } = useData();
  const [selectedFilters, setSelectedFilters] = useState({
    jornal: 'todos',
    status: 'todos',
    valorMin: 0,
    valorMax: 10000
  });

  // Calcular métricas reais a partir dos dados
  const dadosReaisJornais = useMemo(() => {
    return jornais.map(jornal => {
      const paginasJornal = paginas.filter(p => p.jornalId === jornal.id);

      const slotsTotal = paginasJornal.reduce((sum, pagina) => sum + pagina.operadores.length, 0);
      const slotsPagos = paginasJornal.reduce((sum, pagina) =>
        sum + pagina.operadores.filter(op => op.valor > 0).length, 0
      );
      const receita = paginasJornal.reduce((sum, pagina) =>
        sum + pagina.operadores.reduce((opSum, op) => opSum + op.valor, 0), 0
      );
      const ocupacao = slotsTotal > 0 ? (slotsPagos / slotsTotal) * 100 : 0;

      return {
        nome: jornal.nome,
        receita: receita,
        slotsVendidos: slotsPagos,
        slotsTotal: slotsTotal,
        slotsLivres: slotsTotal - slotsPagos,
        ocupacao: ocupacao
      };
    }).filter(j => j.slotsTotal > 0); // Apenas jornais com dados
  }, [jornais, paginas]);

  // Métricas principais calculadas
  const metricas = useMemo(() => {
    const receitaTotal = dadosReaisJornais.reduce((sum, j) => sum + j.receita, 0);
    const slotsTotal = dadosReaisJornais.reduce((sum, j) => sum + j.slotsTotal, 0);
    const slotsVendidos = dadosReaisJornais.reduce((sum, j) => sum + j.slotsVendidos, 0);
    const slotsLivres = slotsTotal - slotsVendidos;
    const taxaOcupacao = slotsTotal > 0 ? (slotsVendidos / slotsTotal) * 100 : 0;
    const ticketMedio = slotsVendidos > 0 ? receitaTotal / slotsVendidos : 0;
    const potencialLivres = ticketMedio * slotsLivres;

    // Contar operadores únicos
    const operadoresSet = new Set<string>();
    paginas.forEach(pagina => {
      pagina.operadores.forEach(op => {
        operadoresSet.add(op.nome.toLowerCase().trim());
      });
    });

    return {
      receitaTotal,
      taxaOcupacao,
      slotsLivres,
      slotsTotal,
      ticketMedio,
      potencialLivres,
      slotsVendidos,
      totalJornais: dadosReaisJornais.length,
      totalPaginas: paginas.length,
      operadoresUnicos: operadoresSet.size
    };
  }, [dadosReaisJornais, paginas]);

  // Dados para gráficos
  const dadosReceita = useMemo(() => {
    return dadosReaisJornais.map(jornal => ({
      nome: jornal.nome,
      receita: jornal.receita,
      slots: jornal.slotsTotal,
      vendidos: jornal.slotsVendidos,
      livres: jornal.slotsLivres
    }));
  }, [dadosReaisJornais]);

  const chartConfig = {
    receita: { label: "Receita", color: "#2F6BFF" },
    vendidos: { label: "Vendidos", color: "#10B981" },
    livres: { label: "Livres", color: "#F59E0B" }
  };

  return (
    <div className="space-y-6">
      {/* Header KPIs com dados reais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#2F6BFF' }}>
              € {metricas.receitaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground">
              {metricas.slotsVendidos} slots vendidos
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {metricas.taxaOcupacao.toFixed(1)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${metricas.taxaOcupacao}%` }}
              ></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {metricas.slotsVendidos} de {metricas.slotsTotal} slots
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Slots Livres</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {metricas.slotsLivres}
            </div>
            <div className="text-xs text-muted-foreground">
              Potencial: € {metricas.potencialLivres.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              € {metricas.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground">
              Valor médio por slot vendido
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métricas adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Jornais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#2F6BFF' }}>
              {metricas.totalJornais}
            </div>
            <div className="text-xs text-muted-foreground">Jornais ativos</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Páginas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#2F6BFF' }}>
              {metricas.totalPaginas}
            </div>
            <div className="text-xs text-muted-foreground">Páginas ativas</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Operadores Únicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#2F6BFF' }}>
              {metricas.operadoresUnicos}
            </div>
            <div className="text-xs text-muted-foreground">Operadores diferentes</div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Pizza - Receita por Jornal */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Receita por Jornal</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dadosReceita}
                  dataKey="receita"
                  nameKey="nome"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ nome, receita }) => receita > 0 ? `${nome}: €${(receita/1000).toFixed(1)}k` : null}
                >
                  {dadosReceita.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${index * 72}, 70%, 50%)`} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <TopPerformers dadosJornais={dadosReaisJornais} paginas={paginas} jornais={jornais} />
    </div>
  );
};
