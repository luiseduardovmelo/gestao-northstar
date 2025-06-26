
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Guia dos Operadores
        </h3>
        <div className="text-center py-8 text-gray-500">
          <p>Nenhum operador adicionado no momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Guia dos Operadores
      </h3>
      
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
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            {operadores
              .sort((a, b) => a.ordem - b.ordem)
              .map((operador) => (
                <tr key={operador.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="bg-[#457B9D] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {operador.ordem}
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
                  <td className="py-3 px-4">
                    <Badge
                      variant={operador.status === 'vendido' ? "default" : "secondary"}
                      className={`
                        text-xs
                        ${operador.status === 'vendido' 
                          ? 'bg-orange-100 text-orange-800 border-orange-200' 
                          : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        }
                      `}
                    >
                      {operador.status === 'vendido' ? 'Vendido' : 'Livre'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-gray-900">
                      R$ {operador.status === 'livre' ? '0' : operador.valor.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
