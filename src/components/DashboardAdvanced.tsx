
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Target, DollarSign, Users, AlertCircle } from 'lucide-react';
import { mockJornais } from '@/data/mockData';
import { HeatmapSlots } from '@/components/HeatmapSlots';
import { TopPerformers } from '@/components/TopPerformers';
import { OpportunityPanel } from '@/components/OpportunityPanel';
import { ActivityTimeline } from '@/components/ActivityTimeline';

export const DashboardAdvanced = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    jornal: 'todos',
    status: 'todos',
    valorMin: 0,
    valorMax: 10000
  });

  // Calcular métricas principais
  const calcularMetricas = () => {
    let receitaTotal = 0;
    let slotsVendidos = 0;
    let slotsLivres = 0;
    let slotsTotal = 0;
    let valores = [];
    
    mockJornais.forEach(jornal => {
      jornal.paginas?.forEach(pagina => {
        pagina.operadores?.forEach(operador => {
          slotsTotal++;
          if (operador.status === 'vendido') {
            slotsVendidos++;
            receitaTotal += operador.valor;
            valores.push(operador.valor);
          } else {
            slotsLivres++;
          }
        });
      });
    });

    const taxaOcupacao = slotsTotal > 0 ? (slotsVendidos / slotsTotal) * 100 : 0;
    const ticketMedio = valores.length > 0 ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
    const potencialLivres = slotsLivres * ticketMedio;

    return {
      receitaTotal,
      taxaOcupacao,
      slotsLivres,
      slotsTotal,
      ticketMedio,
      potencialLivres,
      slotsVendidos
    };
  };

  const metricas = calcularMetricas();

  // Dados para gráficos
  const dadosReceita = mockJornais.map(jornal => {
    const receita = jornal.paginas?.reduce((total, pagina) => {
      return total + (pagina.operadores?.reduce((subTotal, op) => {
        return subTotal + (op.status === 'vendido' ? op.valor : 0);
      }, 0) || 0);
    }, 0) || 0;

    const slots = jornal.paginas?.reduce((total, pagina) => {
      return total + (pagina.operadores?.length || 0);
    }, 0) || 0;

    const vendidos = jornal.paginas?.reduce((total, pagina) => {
      return total + (pagina.operadores?.filter(op => op.status === 'vendido').length || 0);
    }, 0) || 0;

    return {
      nome: jornal.nome,
      receita,
      slots,
      vendidos,
      livres: slots - vendidos
    };
  });

  const chartConfig = {
    receita: { label: "Receita", color: "#2F6BFF" },
    vendidos: { label: "Vendidos", color: "#10B981" },
    livres: { label: "Livres", color: "#F59E0B" }
  };

  return (
    <div className="space-y-6">
      {/* Header KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#2F6BFF' }}>
              R$ {(metricas.receitaTotal / 1000).toFixed(1)}k
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +12.5% vs mês anterior
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
              Potencial: R$ {(metricas.potencialLivres / 1000).toFixed(0)}k
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
              R$ {metricas.ticketMedio.toFixed(0)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +8.2% vs mês anterior
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mapa de Calor */}
      <Card>
        <CardHeader>
          <CardTitle>Mapa de Calor - Ocupação dos Slots</CardTitle>
        </CardHeader>
        <CardContent>
          <HeatmapSlots jornais={mockJornais} filters={selectedFilters} />
        </CardContent>
      </Card>

      {/* Layout de duas colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da esquerda - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gráficos de Análise */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gráfico de Pizza - Receita por Jornal */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Receita por Jornal</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dadosReceita}
                        dataKey="receita"
                        nameKey="nome"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ nome, receita }) => `${nome}: R$${(receita/1000).toFixed(0)}k`}
                      >
                        {dadosReceita.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Gráfico de Barras - Slots por Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Slots por Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dadosReceita}>
                      <XAxis dataKey="nome" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Bar dataKey="vendidos" fill="#10B981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="livres" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <TopPerformers jornais={mockJornais} />

          {/* Timeline de Atividades */}
          <ActivityTimeline />
        </div>

        {/* Coluna da direita - 1/3 */}
        <div className="space-y-6">
          {/* Painel de Oportunidades */}
          <OpportunityPanel jornais={mockJornais} />
          
          {/* Meta de Ocupação por Jornal */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5" />
                Metas de Ocupação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dadosReceita.map((jornal, index) => {
                const ocupacao = jornal.slots > 0 ? (jornal.vendidos / jornal.slots) * 100 : 0;
                const meta = 80; // Meta de 80%
                const cor = ocupacao >= meta ? 'bg-green-500' : ocupacao >= 50 ? 'bg-yellow-500' : 'bg-red-500';
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{jornal.nome}</span>
                      <span className={ocupacao >= meta ? 'text-green-600' : 'text-gray-600'}>
                        {ocupacao.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${cor} h-2 rounded-full transition-all`}
                        style={{ width: `${Math.min(ocupacao, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
