import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Operador } from '@/types';
import { Pencil, Trash2, GripVertical } from 'lucide-react';

interface OperadorRankingCardProps {
  operador: Operador;
  posicao: number;
  isEditing?: boolean;
  onEdit?: (operador: Operador) => void;
  onDelete?: (operador: Operador) => void;
  isDragging?: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const OperadorRankingCard: React.FC<OperadorRankingCardProps> = ({
  operador,
  posicao,
  isEditing = false,
  onEdit,
  onDelete,
  isDragging = false,
  dragHandleProps
}) => {
  const isPago = operador.valor > 0;

  return (
    <Card className={`relative transition-all ${!isPago ? 'bg-orange-50 border-orange-200' : 'bg-white'} ${isDragging ? 'opacity-50 scale-105 shadow-lg' : ''} ${isEditing ? 'ring-2 ring-blue-200' : ''}`}>
      <CardContent className="p-4">
        {/* Drag Handle (só aparece em modo de edição) */}
        {isEditing && (
          <div
            {...dragHandleProps}
            className="absolute top-2 left-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
          >
            <GripVertical className="w-5 h-5" />
          </div>
        )}

        {/* Posição */}
        <div className="absolute top-2 right-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            {posicao}
          </div>
        </div>

        {/* Nome do Operador */}
        <div className={`mt-2 ${isEditing ? 'ml-6' : ''}`}>
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

        {/* Botões de Edição (só aparecem em modo de edição) */}
        {isEditing && (
          <div className="mt-3 pt-3 border-t border-gray-200 flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(operador);
              }}
              className="flex-1"
            >
              <Pencil className="w-4 h-4 mr-1" />
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(operador);
              }}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
