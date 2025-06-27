
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, TrendingUp, DollarSign, Target } from 'lucide-react';
import { Jornal } from '@/types';

interface OpportunityPanelProps {
  jornais: Jornal[];
}

export const OpportunityPanel: React.FC<OpportunityPanelProps> = ({ jornais }) => {
  // Dados reais dos jornais com oportunidades
  const oportunidadesReais = [
    {
      jornal: 'Placar',
      slotsLivres: 28,
      slotsVendidos: 0,
      potencial: 41720, // 28 * 1490
      receitaAtual: 0,
      ticketMedio: 1490,
      ocupacao: 0
    },
    {
      jornal: 'Gazeta do Povo',
      slotsLivres: 25,
      slotsVendidos: 3,
      potencial: 37250, // 25 * 1490
      receitaAtual: 2750,
      ticketMedio: 1490,
      ocupacao: 10.7
    },
    {
      jornal: 'Lakers Brasil',
      slotsLivres: 13,
      slotsVendidos: 5,
      potencial: 19370, // 13 * 1490
      receitaAtual: 11650,
      ticketMedio: 1490,
      ocupacao: 27.8
    },
    {
      jornal: 'Trivela',
      slotsLivres: 15,
      slotsVendidos: 8,
      potencial: 22350, // 15 * 1490
      receitaAtual: 10500,
      ticketMedio: 1490,
      ocupacao: 34.8
    },
    {
      jornal: 'Um Dois Esportes',
      slotsLivres: 13,
      slotsVendidos: 4,
      potencial: 19370, // 13 * 1490
      receitaAtual: 4900,
      ticketMedio: 1490,
      ocupacao: 23.5
    }
  ].sort((a, b) => b.potencial - a.potencial);

  // Alertas de alta prioridade (jornais com mais slots livres)
  const alertas = oportunidadesReais.filter(op => op.slotsLivres >= 10).slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-500" />
          Oportunidades
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Alertas de Alta Prioridade */}
        {alertas.map((alerta, index) => (
          <div key={alerta.jornal} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-orange-800">{alerta.jornal}</h4>
                <p className="text-sm text-orange-700 mt-1">
                  {alerta.slotsLivres} slots livres
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  Potencial: R$ {(alerta.potencial / 1000).toFixed(0)}k
                </p>
              </div>
              <AlertCircle className="h-5 w-5 text-orange-500 mt-1" />
            </div>
            <Button size="sm" className="mt-3 w-full" variant="outline">
              Ver Detalhes
            </Button>
          </div>
        ))}

        {/* Cards de Oportunidade por Jornal */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800 text-sm">Resumo por Jornal</h4>
          {oportunidadesReais.map((op, index) => (
            <div key={op.jornal} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{op.jornal}</span>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3 text-green-600" />
                  <span className="text-xs font-semibold text-green-600">
                    R$ {(op.potencial / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>
                  <span className="text-green-600 font-medium">{op.slotsLivres}</span> livres
                </div>
                <div>
                  <span className="text-blue-600 font-medium">{op.slotsVendidos}</span> vendidos
                </div>
              </div>
              
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${op.ocupacao}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {op.ocupacao.toFixed(1)}% ocupado
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sugestões Baseadas em Dados Reais */}
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Sugestões
          </h4>
          <div className="space-y-2">
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <p className="text-sm text-blue-800">
                <strong>Foco no Placar:</strong> 28 slots livres com potencial de R$ 41,7k
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <p className="text-sm text-green-800">
                <strong>Gazeta do Povo:</strong> Baixa ocupação (10,7%) - oportunidade de crescimento
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <p className="text-sm text-yellow-800">
                <strong>Total de potencial:</strong> R$ 140k em slots livres disponíveis
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
