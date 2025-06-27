
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, TrendingUp, DollarSign, Target } from 'lucide-react';
import { Jornal } from '@/types';

interface OpportunityPanelProps {
  jornais: Jornal[];
}

export const OpportunityPanel: React.FC<OpportunityPanelProps> = ({ jornais }) => {
  // Calcular oportunidades por jornal
  const oportunidades = jornais.map(jornal => {
    const slotsLivres = jornal.paginas?.reduce((total, pagina) => {
      return total + (pagina.operadores?.filter(op => op.status === 'livre').length || 0);
    }, 0) || 0;

    const slotsVendidos = jornal.paginas?.reduce((total, pagina) => {
      return total + (pagina.operadores?.filter(op => op.status === 'vendido').length || 0);
    }, 0) || 0;

    const receitaAtual = jornal.paginas?.reduce((total, pagina) => {
      return total + (pagina.operadores?.reduce((subTotal, op) => {
        return subTotal + (op.status === 'vendido' ? op.valor : 0);
      }, 0) || 0);
    }, 0) || 0;

    const ticketMedio = slotsVendidos > 0 ? receitaAtual / slotsVendidos : 1500;
    const potencial = slotsLivres * ticketMedio;

    return {
      jornal: jornal.nome,
      slotsLivres,
      slotsVendidos,
      potencial,
      receitaAtual,
      ticketMedio,
      slug: jornal.slug
    };
  }).sort((a, b) => b.potencial - a.potencial);

  // Alertas de oportunidade
  const alertas = oportunidades.filter(op => op.slotsLivres >= 5).slice(0, 3);

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
          {oportunidades.map((op, index) => (
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
                    style={{ 
                      width: `${op.slotsVendidos + op.slotsLivres > 0 ? (op.slotsVendidos / (op.slotsVendidos + op.slotsLivres)) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {op.slotsVendidos + op.slotsLivres > 0 ? 
                    ((op.slotsVendidos / (op.slotsVendidos + op.slotsLivres)) * 100).toFixed(0) : 0}% ocupado
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sugestões Baseadas em Histórico */}
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Sugestões
          </h4>
          <div className="space-y-2">
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <p className="text-sm text-blue-800">
                <strong>Foco no Trivela:</strong> Maior potencial de receita com {oportunidades[0]?.slotsLivres || 0} slots livres
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <p className="text-sm text-green-800">
                <strong>Ticket médio:</strong> Aumentar valores pode gerar +R$ 15k mensais
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
