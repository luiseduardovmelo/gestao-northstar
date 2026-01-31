
import React from 'react';
import { Operador } from '@/types';
import { Badge } from '@/components/ui/badge';

interface OperadorGuideProps {
  operadores: Operador[];
}

export const OperadorGuide: React.FC<OperadorGuideProps> = ({ operadores }) => {
  if (operadores.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-8 text-gray-500">
          <p>Nenhum operador nesta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Posição
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Operador
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                Valor Fixo
              </th>
            </tr>
          </thead>
          <tbody>
            {operadores.map((operador, index) => {
              const isPago = operador.valor > 0;
              return (
                <tr
                  key={operador.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 ${!isPago ? 'bg-orange-50' : ''}`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      {operador.logoUrl && (
                        <div
                          className="w-8 h-8 rounded bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url(${operador.logoUrl})` }}
                        />
                      )}
                      <span className="font-medium text-gray-900">{operador.nome}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {isPago ? (
                      <span className="text-sm font-semibold text-green-600">
                        € {operador.valor.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-orange-600">
                        -
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
