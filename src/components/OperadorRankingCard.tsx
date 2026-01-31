import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Operador } from '@/types';

interface OperadorRankingCardProps {
  operador: Operador;
  posicao: number;
}

export const OperadorRankingCard: React.FC<OperadorRankingCardProps> = ({ operador, posicao }) => {
  const isPago = operador.valor > 0;

  return (
    <Card className={`relative ${!isPago ? 'bg-orange-50 border-orange-200' : 'bg-white'}`}>
      <CardContent className="p-4">
        {/* Posição */}
        <div className="absolute top-2 right-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            {posicao}
          </div>
        </div>

        {/* Nome do Operador */}
        <div className="mt-2">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 pr-10">
            {operador.nome}
          </h3>
        </div>

        {/* Valor */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          {isPago ? (
            <div className="text-center">
              <p className="text-xs text-gray-500">Valor Fixo</p>
              <p className="text-lg font-bold text-green-600">
                € {operador.valor.toFixed(2)}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xs text-gray-500">Valor Fixo</p>
              <p className="text-lg font-bold text-orange-600">-</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
