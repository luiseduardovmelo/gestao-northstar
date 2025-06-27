import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Target, DollarSign, Users, AlertCircle } from 'lucide-react';
import { HeatmapSlots } from '@/components/HeatmapSlots';
import { TopPerformers } from '@/components/TopPerformers';
import { ActivityTimeline } from '@/components/ActivityTimeline';

export const DashboardAdvanced = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    jornal: 'todos',
    status: 'todos',
    valorMin: 0,
    valorMax: 10000
  });

  // Dados reais dos jornais
  const dadosReaisJornais = [
    {
      nome: 'Lakers Brasil',
      receita: 11650,
      slotsVendidos: 5,
      slotsTotal: 18,
      ocupacao: 27.8
    },
    {
      nome: 'Trivela',
      receita: 10500,
      slotsVendidos: 8,
      slotsTotal: 23,
      ocupacao: 34.8
    },
    {
      nome: 'Um Dois Esportes',
      receita: 4900,
      slotsVendidos: 4,
      slotsTotal: 17,
      ocupacao: 23.5
    },
    {
      nome: 'Gazeta do Povo',
      receita: 2750,
      slotsVendidos: 3,
      slotsTotal: 28,
      ocupacao: 10.7
    },
    {
      nome: 'Placar',
      receita: 0,
      slotsVendidos: 0,
      slotsTotal: 28,
      ocupacao: 0
    }
  ];

  // Métricas principais com dados reais
  const metricas = {
    receitaTotal: 29800,
    taxaOcupacao: 17.5,
    slotsLivres: 94,
    slotsTotal: 114,
    ticketMedio: 1490,
    potencialLivres: 140060,
    slotsVendidos: 20,
    totalJornais: 5,
    totalPaginas: 66,
    operadoresUnicos: 15
  };

  // Dados para gráficos com valores reais
  const dadosReceita = dadosReaisJornais.map(jornal => ({
    nome: jornal.nome,
    receita: jornal.receita,
    slots: jornal.slotsTotal,
    vendidos: jornal.slotsVendidos,
    livres: jornal.slotsTotal - jornal.slotsVendidos
  }));

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
              R$ {metricas.receitaTotal.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +R$ 8.200 vs mês anterior
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
              {metricas.taxaOcupacao}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all" 
                style={{ width: `${metricas.taxaOcupacao}%` }}
              ></div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +12% vs mês anterior
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
              Potencial: R$ {metricas.potencialLivres.toLocaleString()}
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
              R$ {metricas.ticketMedio.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +3 operadores vs mês anterior
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

      {/* Mapa de Calor */}
      <Card>
        <CardHeader>
          <CardTitle>Mapa de Calor - Ocupação dos Slots</CardTitle>
        </CardHeader>
        <CardContent>
          <HeatmapSlots jornais={[]} filters={selectedFilters} />
        </CardContent>
      </Card>

      {/* Gráficos de Análise com melhor alinhamento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gráfico de Pizza - Receita por Jornal */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Receita por Jornal</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
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
                    label={({ nome, receita }) => `${nome}: R$${(receita/1000).toFixed(1)}k`}
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

        {/* Gráfico de Barras - Slots por Status */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Slots por Status</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
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

      {/* Layout de duas colunas para outros componentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="lg:col-span-2">
          <TopPerformers jornais={[]} />
        </div>
        
        {/* Timeline de Atividades */}
        <div className="lg:col-span-2">
          <ActivityTimeline />
        </div>

        {/* Meta de Ocupação por Jornal com dados reais */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5" />
              Metas de Ocupação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dadosReaisJornais.map((jornal, index) => {
              const ocupacao = jornal.ocupacao;
              const meta = 80; // Meta de 80%
              const cor = ocupacao >= meta ? 'bg-green-500' : ocupacao >= 50 ? 'bg-yellow-500' : 'bg-red-500';
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{jornal.nome}</span>
                    <span className={ocupacao >= meta ? 'text-green-600' : 'text-gray-600'}>
                      {ocupacao.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${cor} h-2 rounded-full transition-all`}
                      style={{ width: `${Math.min(ocupacao, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {jornal.slotsVendidos} de {jornal.slotsTotal} slots vendidos
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
